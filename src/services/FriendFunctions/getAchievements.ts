
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


// Context Data Object used to Cache Results
// Realistically I probably should've put this all in an object but I'm too lazy too now
type AchievementContext = {
    userID: number;
    foundMutualBestie: boolean;
    friendArray?: number[];
    friendOfFriendArray?: number[];
    bestFriend?: number;
    rivalFriendArray?: number[];
    top5Friends?: number[]
    bestFriendBestie?: number;
    mutualBestFriend?: number;
}

export function makeContext(userID: number): AchievementContext {
    let newContext: AchievementContext = {userID, foundMutualBestie: false}
    return newContext;
}

/**
* Calculates all Achievements relative to the given user
* @param User to calculate Friend Achievements of
*/
export async function calculateAchievements(userID: number): Promise<void>{
    await clearAchievements(userID);

    let currentContext: AchievementContext = makeContext(userID);

    await setFriendOfFriend(currentContext);
    await setTop5(currentContext);
    await setBestFriend(currentContext);
    await setMutualBestFriend(currentContext);
    await setRivalFriend(currentContext);
}

/**
* Sets all Achievements friends basck to false
*
* @param userID - User to clear Achievements of
*
*/

async function clearAchievements(userID: number): Promise<void>{
    await Friend.update(
        { isFoF: false, isRival: false, isBest: false, isMutualBest: false, isTop: false },
        {
            where: {
                friendID1: userID
            }
        }
    );
}




// GETTER METHODS FOR EACH CONTEXT

/**
* Returns list of friend ID's of a given user
*
* @param userID - The of user to fetch friends of
* @param [limit] - Optional Parameter gets the top <limit> friends
* @returns An array of Friends ID
*
*/
export async function getFriendsID(currentContext: AchievementContext): Promise<number[]>{
    if (currentContext.friendArray) return currentContext.friendArray; // return cache

   currentContext.friendArray = (await Friend.findAll({
        where:{
            friendID1: currentContext.userID
        },
        attributes: ['friendID2'],
        order: [['score', 'DESC']],
   })).map(f => f.friendID2);

    return currentContext.friendArray
}

export async function getUserID(currentContext: AchievementContext): Promise<number>{
    return currentContext.userID;
}

/**
* Returns list of friend ID's of a given user
*
* @param userID - The of user to fetch friends of
* @returns An array of Friends ID
*
*/

async function getFriendOfFriendID(currentContext: AchievementContext): Promise<number[]>{
    if (currentContext.friendOfFriendArray) return currentContext.friendOfFriendArray

    const FRIEND_IDS = await getFriendsID(currentContext);
    currentContext.friendOfFriendArray = (await Friend.findAll({
        where: {
            friendID1: {[Op.in]: FRIEND_IDS}
        },
        attributes: ['friendID2']
    })).map( f => f.friendID2 );

    return currentContext.friendOfFriendArray;
}

/**
    * Gets your number 1 most talked to friend
* @param currentContext: The data variable for your firend
* @returns number: bestFriend ID
*/
async function getBestFriendID(currentContext: AchievementContext): Promise<number>{
    if(currentContext.bestFriend) return currentContext.bestFriend;
    currentContext.bestFriend = (await getFriendsID(currentContext))[0];
    return currentContext.bestFriend;
}


async function getMutualBestFriendID(currentContext: AchievementContext): Promise<number | undefined>{
    if(currentContext.foundMutualBestie) return currentContext.mutualBestFriend;

    currentContext.bestFriendBestie = (await getBestFriendBestieID(currentContext));

    if (currentContext.bestFriendBestie == currentContext.userID){
        currentContext.mutualBestFriend = await getBestFriendID(currentContext);
    }
    else {
        currentContext.mutualBestFriend = undefined;
    }

    currentContext.foundMutualBestie = true;
    return currentContext.mutualBestFriend;
}

async function getBestFriendBestieID(currentContext: AchievementContext): Promise<number>{
    if(currentContext.bestFriendBestie) return currentContext.bestFriendBestie;

    const BEST_FRIEND_ID: number = await getBestFriendID(currentContext);
    let bestieContext: AchievementContext = makeContext(BEST_FRIEND_ID);

    currentContext.bestFriendBestie = (await getFriendsID(bestieContext))[0];

    return currentContext.bestFriendBestie;
}

async function getTop5FriendID(currentContext: AchievementContext): Promise<number[]> {
    if(currentContext.top5Friends) return currentContext.top5Friends;

    currentContext.top5Friends = (await getFriendsID(currentContext)).slice(0, 5);

    return currentContext.top5Friends;
}


async function getRivalFriendsID(currentContext: AchievementContext): Promise<number[]> {
    if (currentContext.rivalFriendArray) return currentContext.rivalFriendArray;

    const BEST_FRIEND_ID = await getBestFriendID(currentContext);

    const RIVAL_FRIEND_IDS = (await Friend.findAll({
        where: {
            friendID2: BEST_FRIEND_ID,
            isBest: true
        },
        attributes: ['friendID1']
    })).map(f => f.friendID1);

    return RIVAL_FRIEND_IDS
}


// SETTER METHODS FOR EACH ACHIEVEMENT

async function setFriendOfFriend(currentContext: AchievementContext): Promise<void> {
    const USER_ID = await getUserID(currentContext);
    const FOF_List = await getFriendOfFriendID(currentContext);

    if (!FOF_List || !USER_ID) {
        return;
    }

    await Friend.update(
        {isFoF: true},
        {
            where: {
                friendID1: USER_ID,
                friendID2: {[Op.in]: FOF_List}
            }
        }
    );
}

async function setRivalFriend(currentContext: AchievementContext): Promise<void> {

    const USER_ID = await getUserID(currentContext);
    const RIVAL_FRIEND_IDS = await getRivalFriendsID(currentContext);

    if (!USER_ID || !RIVAL_FRIEND_IDS) {
        return;
    }

    await Friend.update(
        {isRival: true},
        {
            where: {
                friendID1: USER_ID,
                friendID2: {[Op.in]: RIVAL_FRIEND_IDS }
            }
        }
    );
}

async function setTop5(currentContext: AchievementContext): Promise<void> {

    const USER_ID = await getUserID(currentContext);
    const TOP_5_FRIENDS = await getTop5FriendID(currentContext);

    if (!USER_ID || !TOP_5_FRIENDS) {
        return;
    }


    await Friend.update(
        {isTop: true},
        {
            where: {
                friendID1: USER_ID,
                friendID2: {[Op.in]: TOP_5_FRIENDS}
            }
        }
    );
}

async function setBestFriend(currentContext: AchievementContext): Promise<void> {

    const USER_ID = await getUserID(currentContext);
    const BEST_FRIEND_ID = await getBestFriendID(currentContext);

    if (!USER_ID || !BEST_FRIEND_ID) {
        return;
    }

    await Friend.update(
        {isBest: true},
        {
            where: {
                friendID1: USER_ID,
                friendID2: BEST_FRIEND_ID
            }
        }
    );
}

async function setMutualBestFriend(currentContext: AchievementContext): Promise<void> {

    const USER_ID = await getUserID(currentContext);
    const MUTUAL_FRIEND_ID = await getMutualBestFriendID(currentContext);

    if (!USER_ID || !MUTUAL_FRIEND_ID) {
        return;
    }

    await Friend.update(
        {isMutualBest: true},
        {
            where: {
                friendID1: USER_ID,
                friendID2: MUTUAL_FRIEND_ID
            }
        }
    );
}


