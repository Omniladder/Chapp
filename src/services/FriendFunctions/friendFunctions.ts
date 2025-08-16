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


async function calculateAchievements(userID: number): Promise<void>{
 
    // Sets all Friends to 0
    console.log("Clearing Friend Achievements");
    await Friend.update(
        { isFoF: false, isRival: false, isBest: false, isMutualBest: false, isTop: false },
        {
            where: {
                friendID1: userID
            }
        }
    )

   
    //Top Friend Calculation ie. Top 5 Friends
    console.log("Calculating Top 5 Friends");
    let topFriends = await Friend.findAll({
        where: {
            friendID1: userID
        },
        attributes: ['friendID2'],
        order: [['score', 'DESC']],
        limit: 5
    });

    await Friend.update(
        {isTop: true},
        {
        where: {
            friendID1: userID,
            friendID2: {[Op.in]:  topFriends.map(r => r.friendID2)},
            score: {[Op.gte]: 3}
        }
    })
    
    //Best Friend Calculation ie. You are my Highest Score Friend
    //Mutual Best Friend Calculation ie. You are my best Friend I am yours
    let bestFriendID = topFriends[0].friendID2;

    if(bestFriendID){
        console.log("Checking and Updating for Mutual Bestie");
        let mutualBest = await Friend.findOne({
            where: {
                friendID1: bestFriendID,
                friendID2: userID,
                isBest: true
            }
        });

        await Friend.update(
            {isBest: true, isMutualBest: !!mutualBest},
            {
            where: {
                friendID1: userID,
                friendID2: bestFriendID
            }
        });
    //Rival Calculation Your Best Friend is My Best Friend
    let rivals = await Friend.findAll({
        where: {
            friendID2: bestFriendID,
            isBest: true
        },
        attributes: ['friendID1']
    })
    if(rivals){
    await Friend.update(
        {isRival: true},
        {
            where: {
                friendID1: userID,
                friendID2: {[Op.in]: rivals.map( r => r.friendID1 )}
            }
        }
    )
    }
    }

    //Friend of Friend Calculation. We share a Friend
    console.log("Setting Friend of Friends");
    let friendIDs = await getFriendsID(userID);
    let friendOfFriendsIDs = await Friend.findAll({
        where: {
            friendID1: {[Op.in]: friendIDs}
        },
        attributes: ['friendID2']
    });

    await Friend.update(
        {isFoF: true},
        {
            where: {
                friendID1: userID,
                friendID2: {[Op.in]: friendOfFriendsIDs.map(r => r.friendID2)}
            }
        }
    );
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

    let friendsOfFriendsList = await Friend.findAll({
        attributes: ['friendID2'],
        where: {
            friendID1:{[Op.in]: friendList}
        }
    });

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

    const fofSet = new Set(friendsOfFriendsList.map(f => f.friendID2));
    
    const users = queriedUsers.map(u => ({
      ...u.get({ plain: true }),
      isFoF: fofSet.has(u.id)
    }));

    
    return {success: true, data: users, message: 'Successful Queried', code: 1000};
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

    if(!req.session?.userID){
        console.log("User ID Doesn't Exist");
        return {success: false, data: null, message: "No User ID Found", code: 1001}
    }

   await calculateAchievements(req.session.userID);

    let currentDate = new Date();
    await Friend.update({
        streak: 0
    }, {
        where: {
            [Op.or]: [
                {friendID1: req.session.userID, endStreakDate: { [Op.lt]: currentDate }},
                {friendID2: req.session.userID, endStreakDate: { [Op.lt]: currentDate }}
            ]
        }
    })

    console.log("Get Friends Called");
    const listOfFriends = await Friend.findAll({
        where:{
            friendID1: req.session.userID
        },
        include: [{
            model: User,
            as: 'user2',
            attributes: ['id', 'username', 'fname', 'lname']
        }],
        attributes: ['missedMessages', 'streak', 'isFoF', 'isRival', 'isTop', 'isBest', 'isMutualBest'],
        order: [['score', 'DESC']]
    })


    return {success: true, data: listOfFriends, message: "RetrivedFriends", code: 1000}
}


