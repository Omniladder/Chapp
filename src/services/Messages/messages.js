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
exports.sendMessage = sendMessage;
exports.getMessages = getMessages;
const sequelize_1 = require("sequelize");
const conversationSchema_1 = require("../../models/conversationSchema");
const models_1 = require("../../models");
const sendMessageSchema_1 = __importDefault(require("./sendMessageSchema"));
const getMessageSchema_1 = __importDefault(require("./getMessageSchema"));
const cache_1 = require("../../lib/cache");
function sendMessage(req) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const schemaTest = sendMessageSchema_1.default.safeParse(req.body);
        if (!(schemaTest.success)) {
            console.error("Failed To Parse Send Message Schema");
            return { success: false, message: "Failed to Parse Schema", code: 1001 };
        }
        let userData = schemaTest.data;
        const NUM_RECENT_MESSAGES = Number(yield cache_1.redis.get((0, cache_1.createKey)("numMessages", req.session.userID)));
        if (50 <= NUM_RECENT_MESSAGES) {
            return { success: false, message: "TOO MANY MESSAGES SENT TOO FAST", code: 1002 };
        }
        try {
            yield conversationSchema_1.Conversation.create({
                'senderID': req.session.userID,
                'receiverID': userData.receiverID,
                'message': userData.message
            });
        }
        catch (err) {
            console.error('name:', err.name);
            console.error('message:', err.message);
            console.error('parent.message:', (_a = err === null || err === void 0 ? void 0 : err.parent) === null || _a === void 0 ? void 0 : _a.message);
            console.error('parent.detail:', (_b = err === null || err === void 0 ? void 0 : err.parent) === null || _b === void 0 ? void 0 : _b.detail);
            console.error('fields:', err === null || err === void 0 ? void 0 : err.fields);
            throw err; // or res.status(400).json({ error: err?.parent?.detail || err.message });
        }
        yield models_1.Friend.increment({ score: 1, missedMessages: 1 }, { where: {
                friendID1: userData.receiverID,
                friendID2: req.session.userID
            }
        });
        yield models_1.Friend.increment('score', {
            by: 1,
            where: {
                friendID1: req.session.userID,
                friendID2: userData.receiverID
            }
        });
        let friendship = yield models_1.Friend.findOne({
            where: {
                friendID1: req.session.userID,
                friendID2: userData.receiverID
            },
        });
        if (friendship.unlockStreakDate < new Date()) {
            let newUnlock = new Date();
            newUnlock.setHours(newUnlock.getHours() + 16);
            let endUnlock = new Date();
            endUnlock.setHours(endUnlock.getHours() + 42);
            yield models_1.Friend.update({
                unlockStreakDate: newUnlock,
                endStreakDate: endUnlock,
                streak: friendship.streak + 1
            }, {
                where: {
                    [sequelize_1.Op.or]: [
                        { friendID1: req.session.userID, friendID2: userData.receiverID },
                        { friendID1: userData.receiverID, friendID2: req.session.userID }
                    ]
                }
            });
        }
        yield cache_1.redis.del((0, cache_1.createKey)("getMessages", req.session.userID, req.session.receiverID));
        yield cache_1.redis.incr((0, cache_1.createKey)("numMessages", req.session.userID));
        yield cache_1.redis.expire((0, cache_1.createKey)("numMessages", req.session.userID), 60); // 5 Message a Miniute Limit
        return { success: true, message: "Received Message", code: 1000 };
    });
}
function getMessages(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const schemaTest = getMessageSchema_1.default.safeParse(req.body);
        if (!(schemaTest.success)) {
            console.error("Failed To Parse Get Message Schema");
            return { success: false, data: null, message: "Failed to Parse Schema", code: 1001 };
        }
        //TODO: Add Redis Cache Here
        const CACHED_MESSAGE_DATA = yield cache_1.redis.get((0, cache_1.createKey)("getMessages", req.session.userID, req.session.receiverID));
        if (CACHED_MESSAGE_DATA) {
            const CACHED_MESSAGE = JSON.parse(CACHED_MESSAGE_DATA);
            return { success: true, data: CACHED_MESSAGE, message: "Received Message", code: 1000 };
        }
        let messages = yield conversationSchema_1.Conversation.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { senderID: req.session.userID, receiverID: schemaTest.data.receiverID },
                    { senderID: schemaTest.data.receiverID, receiverID: req.session.userID }
                ]
            },
            attributes: ['message', 'senderID', 'receiverID'],
            order: [['createdAt', 'DESC']]
        });
        yield models_1.Friend.update({ 'missedMessages': 0 }, {
            where: {
                friendID1: req.session.userID,
                friendID2: schemaTest.data.receiverID
            }
        });
        console.log("Reset Missed Messages");
        yield cache_1.redis.set((0, cache_1.createKey)("getMessages", req.session.userID, req.session.receiverID), JSON.stringify(messages));
        return { success: true, data: messages, message: "Received Message", code: 1000 };
    });
}
