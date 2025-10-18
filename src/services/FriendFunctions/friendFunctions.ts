import { Request } from 'express';
import sequelize from '../../dbFiles/db';
import { Op } from 'sequelize';

import querySchema from './querySchema';
import addFriendSchema from './addFriendSchema';
import removeFriendSchema from './removeFriendSchema';
import { calculateAchievements, getFriendsID, makeContext } from './getAchievements'

// DB ORM Object
import { User } from "../../models/userSchema";
import { Friend } from '../../models/friendSchema';
import { Conversation } from '../../models';


export async function queryPeople(req: Request){
    
    const schemaTest = querySchema.safeParse(req.body);

    if(!schemaTest.success){
        return {success: false, data: null, message: "Request Parsing Failed", code: 1001};
    }

    let queryData = schemaTest.data;
    let queriedUsers = [];

    const NEW_CONTEXT = makeContext(req.session.userID!)
    let friendList = await getFriendsID(NEW_CONTEXT);
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


export async function removeFriend(req: Request){
    const friend1 = req.session.userID;
    const friend2Data = removeFriendSchema.safeParse(req.body)
    if(!friend2Data){
        return {success: false, message: "Failed to Decode Inputted Body", code: 1001}
    }
    const friend2 = friend2Data.data?.friendID;

    let friendDelRes = Friend.destroy({
        where: {
            [Op.or]: [
                { 
                    [Op.and]: [
                        {friendID1: friend1 },
                        {friendID2: friend2 }
                    ]
                },
                {  
                    [Op.and]: [
                        {friendID1: friend2 },
                        {friendID2: friend1 }
                    ]
                }
            ]
        }
    })

    await Conversation.destroy({
        where: {
            [Op.or]: [
                { 
                    [Op.and]: [
                        {senderID: friend1 },
                        {receiverID: friend2 }
                    ]
                },
                {  
                    [Op.and]: [
                        {senderID: friend2 },
                        {receiverID: friend1 }
                    ]
                }
            ]
        }
    })

    await friendDelRes;

    return {success: true, message: "RetrivedFriends", code: 1000}
}



