
/**
    * Author: Dustin O'Brien
    * Description:
    * File dedicated to helper functions for calculating and getting Achievements
    *
    * Functions:
    * calculateAchievements(): Main function for calculating all Achievements
*/




import { Friend } from '../../models/friendSchema';
import { Op } from 'sequelize';




export async function calculateAchievements(userID: number): Promise<void>{
 
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

    if(topFriends.length != 0){ //If You have friends lol.

ait Friend.update(
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
}

export async function getFriendsID(userID: number): Promise<number[]>{
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




