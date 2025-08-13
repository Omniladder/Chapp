import session from 'express-session';
import { Op } from 'sequelize';

import { Conversation } from "../../models/conversationSchema";
import { Friend } from '../../models/friendSchema';

import sendMessageSchema from './sendMessageSchema';
import getMessageSchema from './getMessageSchema'


export async function sendMessage(req: any): Promise<any> {

    const schemaTest = sendMessageSchema.safeParse(req.body);

    if(!(schemaTest.success)){
        console.error("Failed To Parse Send Message Schema"); 
        return {success: false, message: "Failed to Parse Schema", code: 1001};
    }

    console.log
    let userData = schemaTest.data;

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

    await Friend.increment('score', {
        by: 1,
        where: {
            friendID1: req.session.userID,
            friendID2: userData.receiverID
        }
    });

    await Friend.increment('score', {
        by: 1,
        where: {
            friendID1: userData.receiverID,
            friendID2: req.session.userID
        }
    });


    return {success: true, message: "Received Message", code: 1000};
}

export async function getMessages(req: any){
    
    const schemaTest = getMessageSchema.safeParse(req.body);

    if(!(schemaTest.success)){
        console.error("Failed To Parse Get Message Schema"); 
        return {success: false, data: null, message: "Failed to Parse Schema", code: 1001};
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


    return {success: true, data: messages, message: "Received Message", code: 1000};
}



