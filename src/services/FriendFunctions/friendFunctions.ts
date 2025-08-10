import express, { Request, response, Response } from 'express';
import { Op } from 'sequelize';

import querySchema from './querySchema';
import addFriendSchema from './addFriendSchema';


// DB ORM Object
import { User } from "../../models/userSchema";
import { Friend } from '../../models/friendSchema';
import session from 'express-session';
import { number } from 'zod';


async function getFriends(userID: number): Promise<number[]>{
   const friends = await Friend.findAll({
       where:{
           friendID1: userID 
       },
       attributes: ['friendID2']
   })

    let friendIDs : number[] = [];
    for (let friend of friends){
        friendIDs.push(friend.friendID2);
    }
    return friendIDs
}

//TODO: Add Similarity Search
//TODO: Remove People your already friends with
export async function queryPeople(req: Request){
    
    const schemaTest = querySchema.safeParse(req.body);

    if(!schemaTest.success){
        return {success: false, data: null, message: "Request Parsing Failed", code: 1001};
    }

    let queryData = schemaTest.data;
    let queriedUsers = [];

    let friendList = await getFriends(req.session.userID!);
    friendList.push(req.session.userID!)

    try{

        queriedUsers = await User.findAll({
            attributes: ['id', 'username', 'fname', 'lname'],
            where: {
                id: { [Op.notIn]: friendList}
            },
            order: [['username', 'ASC']],
            limit: queryData.numberOfPeople
        });
    }
    catch(err: any) {
        console.error("Sequelize Query Failed::");
        console.error('message:', err.message);
        console.error('pg message:', err?.parent?.message); 
        console.error('pg detail:', err?.parent?.detail);  
        return {success: false, data: null, message: "Failed to query Data", code: 1002};
    }


    //Remove IDs once no longer needed
    /*
    let cleanUsers = queriedUsers.map(user => {
      const { id, ...rest } = user.get({ plain: true });
      return {...rest, friendOfFriend: true }; // everything except id
    });
    */

    
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



