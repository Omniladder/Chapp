"use strict";
/**
    * Author: Dustin O'Brien
    * Description:
    * File dedicated to helper functions for calculating and getting Achievements
    *
    * Functions:
    * calculateAchievements(): Main function for calculating all Achievements
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeContext = makeContext;
exports.calculateAchievements = calculateAchievements;
exports.getFriendsID = getFriendsID;
exports.getUserID = getUserID;
const friendSchema_1 = require("../../models/friendSchema");
const sequelize_1 = require("sequelize");
function makeContext(userID) {
    let newContext = { userID, foundMutualBestie: false };
    return newContext;
}
/**
* Calculates all Achievements relative to the given user
* @param User to calculate Friend Achievements of
*/
function calculateAchievements(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        yield clearAchievements(userID);
        let currentContext = makeContext(userID);
        yield setFriendOfFriend(currentContext);
        yield setTop5(currentContext);
        yield setBestFriend(currentContext);
        yield setMutualBestFriend(currentContext);
        yield setRivalFriend(currentContext);
    });
}
/**
* Sets all Achievements friends basck to false
*
* @param userID - User to clear Achievements of
*
*/
function clearAchievements(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        yield friendSchema_1.Friend.update({ isFoF: false, isRival: false, isBest: false, isMutualBest: false, isTop: false }, {
            where: {
                friendID1: userID
            }
        });
    });
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
function getFriendsID(currentContext) {
    return __awaiter(this, void 0, void 0, function* () {
        if (currentContext.friendArray)
            return currentContext.friendArray; // return cache
        currentContext.friendArray = (yield friendSchema_1.Friend.findAll({
            where: {
                friendID1: currentContext.userID
            },
            attributes: ['friendID2'],
            order: [['score', 'DESC']],
        })).map(f => f.friendID2);
        return currentContext.friendArray;
    });
}
function getUserID(currentContext) {
    return __awaiter(this, void 0, void 0, function* () {
        return currentContext.userID;
    });
}
/**
* Returns list of friend ID's of a given user
*
* @param userID - The of user to fetch friends of
* @returns An array of Friends ID
*
*/
function getFriendOfFriendID(currentContext) {
    return __awaiter(this, void 0, void 0, function* () {
        if (currentContext.friendOfFriendArray)
            return currentContext.friendOfFriendArray;
        const FRIEND_IDS = yield getFriendsID(currentContext);
        currentContext.friendOfFriendArray = (yield friendSchema_1.Friend.findAll({
            where: {
                friendID1: { [sequelize_1.Op.in]: FRIEND_IDS }
            },
            attributes: ['friendID2']
        })).map(f => f.friendID2);
        return currentContext.friendOfFriendArray;
    });
}
/**
    * Gets your number 1 most talked to friend
* @param currentContext: The data variable for your firend
* @returns number: bestFriend ID
*/
function getBestFriendID(currentContext) {
    return __awaiter(this, void 0, void 0, function* () {
        if (currentContext.bestFriend)
            return currentContext.bestFriend;
        currentContext.bestFriend = (yield getFriendsID(currentContext))[0];
        return currentContext.bestFriend;
    });
}
function getMutualBestFriendID(currentContext) {
    return __awaiter(this, void 0, void 0, function* () {
        if (currentContext.foundMutualBestie)
            return currentContext.mutualBestFriend;
        currentContext.bestFriendBestie = (yield getBestFriendBestieID(currentContext));
        if (currentContext.bestFriendBestie == currentContext.userID) {
            currentContext.mutualBestFriend = yield getBestFriendID(currentContext);
        }
        else {
            currentContext.mutualBestFriend = undefined;
        }
        currentContext.foundMutualBestie = true;
        return currentContext.mutualBestFriend;
    });
}
function getBestFriendBestieID(currentContext) {
    return __awaiter(this, void 0, void 0, function* () {
        if (currentContext.bestFriendBestie)
            return currentContext.bestFriendBestie;
        const BEST_FRIEND_ID = yield getBestFriendID(currentContext);
        let bestieContext = makeContext(BEST_FRIEND_ID);
        currentContext.bestFriendBestie = (yield getFriendsID(bestieContext))[0];
        return currentContext.bestFriendBestie;
    });
}
function getTop5FriendID(currentContext) {
    return __awaiter(this, void 0, void 0, function* () {
        if (currentContext.top5Friends)
            return currentContext.top5Friends;
        currentContext.top5Friends = (yield getFriendsID(currentContext)).slice(0, 5);
        return currentContext.top5Friends;
    });
}
function getRivalFriendsID(currentContext) {
    return __awaiter(this, void 0, void 0, function* () {
        if (currentContext.rivalFriendArray)
            return currentContext.rivalFriendArray;
        const BEST_FRIEND_ID = yield getBestFriendID(currentContext);
        const RIVAL_FRIEND_IDS = (yield friendSchema_1.Friend.findAll({
            where: {
                friendID2: BEST_FRIEND_ID,
                isBest: true
            },
            attributes: ['friendID1']
        })).map(f => f.friendID1);
        return RIVAL_FRIEND_IDS;
    });
}
// SETTER METHODS FOR EACH ACHIEVEMENT
function setFriendOfFriend(currentContext) {
    return __awaiter(this, void 0, void 0, function* () {
        const USER_ID = yield getUserID(currentContext);
        const FOF_List = yield getFriendOfFriendID(currentContext);
        if (!FOF_List || !USER_ID) {
            return;
        }
        yield friendSchema_1.Friend.update({ isFoF: true }, {
            where: {
                friendID1: USER_ID,
                friendID2: { [sequelize_1.Op.in]: FOF_List }
            }
        });
    });
}
function setRivalFriend(currentContext) {
    return __awaiter(this, void 0, void 0, function* () {
        const USER_ID = yield getUserID(currentContext);
        const RIVAL_FRIEND_IDS = yield getRivalFriendsID(currentContext);
        if (!USER_ID || !RIVAL_FRIEND_IDS) {
            return;
        }
        yield friendSchema_1.Friend.update({ isRival: true }, {
            where: {
                friendID1: USER_ID,
                friendID2: { [sequelize_1.Op.in]: RIVAL_FRIEND_IDS }
            }
        });
    });
}
function setTop5(currentContext) {
    return __awaiter(this, void 0, void 0, function* () {
        const USER_ID = yield getUserID(currentContext);
        const TOP_5_FRIENDS = yield getTop5FriendID(currentContext);
        if (!USER_ID || !TOP_5_FRIENDS) {
            return;
        }
        yield friendSchema_1.Friend.update({ isTop: true }, {
            where: {
                friendID1: USER_ID,
                friendID2: { [sequelize_1.Op.in]: TOP_5_FRIENDS }
            }
        });
    });
}
function setBestFriend(currentContext) {
    return __awaiter(this, void 0, void 0, function* () {
        const USER_ID = yield getUserID(currentContext);
        const BEST_FRIEND_ID = yield getBestFriendID(currentContext);
        if (!USER_ID || !BEST_FRIEND_ID) {
            return;
        }
        yield friendSchema_1.Friend.update({ isBest: true }, {
            where: {
                friendID1: USER_ID,
                friendID2: BEST_FRIEND_ID
            }
        });
    });
}
function setMutualBestFriend(currentContext) {
    return __awaiter(this, void 0, void 0, function* () {
        const USER_ID = yield getUserID(currentContext);
        const MUTUAL_FRIEND_ID = yield getMutualBestFriendID(currentContext);
        if (!USER_ID || !MUTUAL_FRIEND_ID) {
            return;
        }
        yield friendSchema_1.Friend.update({ isMutualBest: true }, {
            where: {
                friendID1: USER_ID,
                friendID2: MUTUAL_FRIEND_ID
            }
        });
    });
}
