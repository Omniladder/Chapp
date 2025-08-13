import express, { Request, response, Response } from 'express';
import sequelize from '../../dbFiles/db';
import { Op } from 'sequelize';

import querySchema from './querySchema';
import addFriendSchema from './addFriendSchema';


// DB ORM Object
import { User } from "../../models/userSchema";
import { Friend } from '../../models/friendSchema';
import session from 'express-session';
import { number, success } from 'zod';

type user = {
    userID: number;
    username: string;
    fname: string;
    lname: string;
}

async function getFriendsID(userID: number): Promise<number[]>{
   const friends = await Friend.findAll({
        where:{
            friendID1: userID 
        },
        attributes: ['friendID2'],
        order: [['score', 'DESC']]
   })

    let friendIDs : number[] = [];
    for (let friend of friends){
        friendIDs.push(friend.friendID2);
    }
    return friendIDs
}

//TODO: Add Similarity Search
export async function queryPeople(req: Request){
    
    const schemaTest = querySchema.safeParse(req.body);

    if(!schemaTest.success){
        return {success: false, data: null, message: "Request Parsing Failed", code: 1001};
    }

    let queryData = schemaTest.data;
    let queriedUsers = [];

    let friendList = await getFriendsID(req.session.userID!);
    friendList.push(req.session.userID!)

    try{
        if(!queryData.hasSearchTerm)
            queriedUsers = await User.findAll({
                attributes: ['id', 'username', 'fname', 'lname'],
                where:  {
                    id:    { [Op.notIn]: friendList}
                },
                order: [['username', 'DESC']],
                limit: queryData.numberOfPeople
            });
        else {
            queriedUsers = await User.findAll({
                attributes: ['id', 'username', 'fname', 'lname'],
                where: {
                    id: { [Op.notIn]: friendList}
                },
                order: [[sequelize.literal(`similarity(username, '${queryData.searchTerm}')`), 'DESC']],
                limit: queryData.numberOfPeople
            });

        }
    }
    catch(err: any) {
        console.error("Sequelize Query Failed::");
        console.error('message:', err.message);
        console.error('pg message:', err?.parent?.message); 
        console.error('pg detail:', err?.parent?.detail);  
        return {success: false, data: null, message: "Failed to query Data", code: 1002};
    }


    
    return {success: true, data: queriedUsers, message: 'Successful Queried', code: 1000};
}

export async function addFriend(req: Request){

    console.log("Body: ", req.body)
    const schemaTest = addFriendSchema.safeParse(req.body);
    if(!schemaTest.success){
        console.error("Failed to Parse Add Friend Schema");
        return {success: false, message: 'Failed to Parse Schema', code: 1001};
    }

    
    let connection = Friend.create({
       'friendID1': req.session.userID,
       'friendID2': schemaTest.data.friendID,
    });

    await Friend.create({
       'friendID1': schemaTest.data.friendID,
       'friendID2': req.session.userID,
    });
    await connection;


    return {success: true, message: 'Successfully Added Friend', code: 1000};
}

export async function getFriends(req: any): Promise<any>{

    console.log("Get Friends Called");
    const friends = await Friend.findAll({
        where:{
            friendID1: req.session.userID
        },
        attributes: ['friendID2'],
        order: [['score', 'DESC']]
    })

    let friendIDs : number[] = [];
    for (let friend of friends){
        friendIDs.push(friend.friendID2);
    }


    let listOfFriends = await User.findAll({
             attributes: ['id', 'username', 'fname', 'lname'],
             where: {
                 id:{ [Op.in]: friendIDs}
             },
            order:[[sequelize.literal(`array_position(ARRAY[${friendIDs.join(',')}]::int[], "User"."id")`), 'ASC']]
        });

        console.log("Friends Found: ", listOfFriends);

    return {success: true, data: listOfFriends, message: "RetrivedFriends", code: 1000}
}


