import session from 'express-session';
import { Op, where } from 'sequelize';

import { Conversation } from "../../models/conversationSchema";
import { Friend, User} from '../../models';

import sendMessageSchema from './sendMessageSchema';
import getMessageSchema from './getMessageSchema'
import { createKey, redis } from '../../lib/cache';

export async function sendMessage(req: any): Promise<any> {

    const schemaTest = sendMessageSchema.safeParse(req.body);

    if(!(schemaTest.success)){
        console.error("Failed To Parse Send Message Schema"); 
        return {success: false, message: "Failed to Parse Schema", code: 1001};
    }


    let userData = schemaTest.data;


    const NUM_RECENT_MESSAGES = Number(await redis.get(createKey("numMessages", req.session.userID)))
    if( 50 <= NUM_RECENT_MESSAGES){
        return {success: false, message: "TOO MANY MESSAGES SENT TOO FAST", code: 1002};
    }

    try{
        await Conversation.create({
            'senderID': req.session.userID,
            'receiverID': userData.receiverID,
            'message': userData.message
        });
        } catch (err: any) {
            console.error('name:', err.name);
            console.error('message:', err.message);
            console.error('parent.message:', err?.parent?.message);
            console.error('parent.detail:', err?.parent?.detail);
            console.error('fields:', err?.fields);
            throw err; // or res.status(400).json({ error: err?.parent?.detail || err.message });
        }

    await Friend.increment(
        { score: 1, missedMessages: 1 },
        {where: {
            friendID1: userData.receiverID,
            friendID2: req.session.userID
        }
    }
    );

    await Friend.increment('score', {
        by: 1,
        where: {
            friendID1: req.session.userID,
            friendID2: userData.receiverID
        }
    });

    let friendship = await Friend.findOne({
        where: {
            friendID1: req.session.userID,
            friendID2: userData.receiverID
        },
    });

    if(friendship!.unlockStreakDate < new Date()){

        let newUnlock = new Date();
        newUnlock.setHours(newUnlock.getHours() + 16);

        let endUnlock = new Date();
        endUnlock.setHours(endUnlock.getHours() + 42);

        await Friend.update({
            unlockStreakDate: newUnlock,
            endStreakDate: endUnlock,
            streak: friendship!.streak + 1
        }, {
            where: {
            [Op.or]: [
                {friendID1: req.session.userID, friendID2: userData.receiverID},
                {friendID1: userData.receiverID, friendID2: req.session.userID}
            ]
            }
        })
    }

    await redis.del(createKey("getMessages", req.session.userID, req.session.receiverID))
    await redis.incr(createKey("numMessages", req.session.userID))
    await redis.expire(createKey("numMessages", req.session.userID), 60) // 5 Message a Miniute Limit

    return {success: true, message: "Received Message", code: 1000};
}

export async function getMessages(req: any){
    
    const schemaTest = getMessageSchema.safeParse(req.body);

    if(!(schemaTest.success)){
        console.error("Failed To Parse Get Message Schema"); 
        return {success: false, data: null, message: "Failed to Parse Schema", code: 1001};
    }

    //TODO: Add Redis Cache Here
    const CACHED_MESSAGE_DATA = await redis.get(createKey("getMessages", req.session.userID, req.session.receiverID))
    if(CACHED_MESSAGE_DATA){
        const CACHED_MESSAGE = JSON.parse(CACHED_MESSAGE_DATA);
        return {success: true, data: CACHED_MESSAGE, message: "Received Message", code: 1000};
    }

    let messages = await Conversation.findAll({
        where: {
            [Op.or]: [
                {senderID: req.session.userID, receiverID: schemaTest.data.receiverID},
                {senderID: schemaTest.data.receiverID, receiverID: req.session.userID}
            ]
        },
        attributes: ['message', 'senderID', 'receiverID'],
        order: [['createdAt', 'DESC']]
    });

    await Friend.update(
        {'missedMessages': 0},
        {
            where: {
                friendID1: req.session.userID,
                friendID2: schemaTest.data.receiverID
            }
        }
    );
    console.log("Reset Missed Messages");

    await redis.set(createKey("getMessages", req.session.userID, req.session.receiverID), JSON.stringify(messages))

    return {success: true, data: messages, message: "Received Message", code: 1000};
}



