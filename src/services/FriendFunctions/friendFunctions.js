"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryPeople = queryPeople;
exports.addFriend = addFriend;
exports.getFriends = getFriends;
exports.removeFriend = removeFriend;
const db_1 = __importDefault(require("../../dbFiles/db"));
const sequelize_1 = require("sequelize");
const querySchema_1 = __importDefault(require("./querySchema"));
const addFriendSchema_1 = __importDefault(require("./addFriendSchema"));
const removeFriendSchema_1 = __importDefault(require("./removeFriendSchema"));
const getAchievements_1 = require("./getAchievements");
const cache_1 = require("../../lib/cache");
// DB ORM Object
const userSchema_1 = require("../../models/userSchema");
const friendSchema_1 = require("../../models/friendSchema");
const models_1 = require("../../models");
function queryPeople(req) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const schemaTest = querySchema_1.default.safeParse(req.body);
        if (!schemaTest.success) {
            return { success: false, data: null, message: "Request Parsing Failed", code: 1001 };
        }
        let queryData = schemaTest.data;
        let queriedUsers = [];
        const CACHED_USER_DATA = yield cache_1.redis.get((0, cache_1.createKey)("queryPeople", String(req.session.userID), queryData.searchTerm));
        if (CACHED_USER_DATA) {
            const CACHED_USERS = JSON.parse(CACHED_USER_DATA);
            return { success: true, data: CACHED_USERS, message: 'Queried Cached', code: 1000 };
        }
        const NEW_CONTEXT = (0, getAchievements_1.makeContext)(req.session.userID);
        let friendList = yield (0, getAchievements_1.getFriendsID)(NEW_CONTEXT);
        friendList.push(req.session.userID);
        let friendsOfFriendsList = yield friendSchema_1.Friend.findAll({
            attributes: ['friendID2'],
            where: {
                friendID1: { [sequelize_1.Op.in]: friendList }
            }
        });
        try {
            if (!queryData.hasSearchTerm)
                queriedUsers = yield userSchema_1.User.findAll({
                    attributes: ['id', 'username', 'fname', 'lname'],
                    where: {
                        id: { [sequelize_1.Op.notIn]: friendList }
                    },
                    order: [['username', 'DESC']],
                    limit: queryData.numberOfPeople
                });
            else {
                queriedUsers = yield userSchema_1.User.findAll({
                    attributes: ['id', 'username', 'fname', 'lname'],
                    where: {
                        id: { [sequelize_1.Op.notIn]: friendList }
                    },
                    order: [[db_1.default.literal(`similarity(username, '${queryData.searchTerm}')`), 'DESC']],
                    limit: queryData.numberOfPeople
                });
            }
        }
        catch (err) {
            console.error("Sequelize Query Failed::");
            console.error('message:', err.message);
            console.error('pg message:', (_a = err === null || err === void 0 ? void 0 : err.parent) === null || _a === void 0 ? void 0 : _a.message);
            console.error('pg detail:', (_b = err === null || err === void 0 ? void 0 : err.parent) === null || _b === void 0 ? void 0 : _b.detail);
            return { success: false, data: null, message: "Failed to query Data", code: 1002 };
        }
        const fofSet = new Set(friendsOfFriendsList.map(f => f.friendID2));
        const users = queriedUsers.map(u => (Object.assign(Object.assign({}, u.get({ plain: true })), { isFoF: fofSet.has(u.id) })));
        yield cache_1.redis.set((0, cache_1.createKey)("queryPeople", String(req.session.userID), queryData.searchTerm), JSON.stringify(users));
        return { success: true, data: users, message: 'Successful Queried', code: 1000 };
    });
}
function addFriend(req) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Body: ", req.body);
        const schemaTest = addFriendSchema_1.default.safeParse(req.body);
        if (!schemaTest.success) {
            console.error("Failed to Parse Add Friend Schema");
            return { success: false, message: 'Failed to Parse Schema', code: 1001 };
        }
        let connection = friendSchema_1.Friend.create({
            'friendID1': req.session.userID,
            'friendID2': schemaTest.data.friendID,
        });
        yield friendSchema_1.Friend.create({
            'friendID1': schemaTest.data.friendID,
            'friendID2': req.session.userID,
        });
        yield connection;
        const QUERY_PATTERN = (0, cache_1.createKey)("queryPeople", String(req.session.userID)) + "*";
        const QUERY_KEYS = yield cache_1.redis.keys(QUERY_PATTERN);
        console.log("Query Keys: ", QUERY_KEYS);
        yield cache_1.redis.del(QUERY_KEYS);
        const FRIEND_KEY = (0, cache_1.createKey)("getListofFriends", String(req.session.userID));
        yield cache_1.redis.del(FRIEND_KEY);
        return { success: true, message: 'Successfully Added Friend', code: 1000 };
    });
}
function getFriends(req) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.userID)) {
            console.log("User ID Doesn't Exist");
            return { success: false, data: null, message: "No User ID Found", code: 1001 };
        }
        const USER_ID = req.session.userID;
        console.log("Get Friends Called");
        yield (0, getAchievements_1.calculateAchievements)(USER_ID);
        yield updateStreaks(USER_ID);
        const LIST_OF_FRIENDS = yield getListofFriends(USER_ID);
        return { success: true, data: LIST_OF_FRIENDS, message: "RetrivedFriends", code: 1000 };
    });
}
function getListofFriends(USER_ID) {
    return __awaiter(this, void 0, void 0, function* () {
        const CACHED_USERS_DATA = yield cache_1.redis.get((0, cache_1.createKey)("getListofFriends", String(USER_ID)));
        if (CACHED_USERS_DATA) {
            const USER_DATA = JSON.parse(CACHED_USERS_DATA);
            return USER_DATA;
        }
        const LIST_OF_FRIENDS = yield friendSchema_1.Friend.findAll({
            where: {
                friendID1: USER_ID
            },
            include: [{
                    model: userSchema_1.User,
                    as: 'user2',
                    attributes: ['id', 'username', 'fname', 'lname']
                }],
            attributes: ['missedMessages', 'streak', 'isFoF', 'isRival', 'isTop', 'isBest', 'isMutualBest', 'score'],
            order: [['score', 'DESC']]
        });
        yield cache_1.redis.set((0, cache_1.createKey)("getListofFriends", String(USER_ID)), JSON.stringify(LIST_OF_FRIENDS));
        return LIST_OF_FRIENDS;
    });
}
function updateStreaks(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        let currentDate = new Date();
        yield friendSchema_1.Friend.update({
            streak: 0
        }, {
            where: {
                [sequelize_1.Op.or]: [
                    { friendID1: userID, endStreakDate: { [sequelize_1.Op.lt]: currentDate } },
                    { friendID2: userID, endStreakDate: { [sequelize_1.Op.lt]: currentDate } }
                ]
            }
        });
    });
}
function removeFriend(req) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const friend1 = req.session.userID;
        const friend2Data = removeFriendSchema_1.default.safeParse(req.body);
        if (!friend2Data) {
            return { success: false, message: "Failed to Decode Inputted Body", code: 1001 };
        }
        const friend2 = (_a = friend2Data.data) === null || _a === void 0 ? void 0 : _a.friendID;
        let friendDelRes = friendSchema_1.Friend.destroy({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        [sequelize_1.Op.and]: [
                            { friendID1: friend1 },
                            { friendID2: friend2 }
                        ]
                    },
                    {
                        [sequelize_1.Op.and]: [
                            { friendID1: friend2 },
                            { friendID2: friend1 }
                        ]
                    }
                ]
            }
        });
        yield models_1.Conversation.destroy({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        [sequelize_1.Op.and]: [
                            { senderID: friend1 },
                            { receiverID: friend2 }
                        ]
                    },
                    {
                        [sequelize_1.Op.and]: [
                            { senderID: friend2 },
                            { receiverID: friend1 }
                        ]
                    }
                ]
            }
        });
        yield friendDelRes;
        // TODO: Delete Redis Cache here Both Friends and Query
        const QUERY_PATTERN = (0, cache_1.createKey)("queryPeople", String(req.session.userID)) + "*";
        console.log("Query Pattern", QUERY_PATTERN);
        const QUERY_KEYS = yield cache_1.redis.keys(QUERY_PATTERN);
        console.log("Query Keys: ", QUERY_KEYS);
        if (QUERY_KEYS) {
            yield cache_1.redis.del(QUERY_KEYS);
        }
        const FRIEND_KEY = (0, cache_1.createKey)("getListofFriends", String(req.session.userID));
        if (FRIEND_KEY) {
            yield cache_1.redis.del(FRIEND_KEY);
        }
        return { success: true, message: "RetrivedFriends", code: 1000 };
    });
}
