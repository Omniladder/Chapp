import express, { Request, response, Response } from 'express';

import querySchema from './querySchema';


// DB ORM Object
import { User } from "../../models/userSchema";


//TODO: Add Similarity Search
//TODO: Remove People your already friends with
export async function queryPeople(req: Request){
    
    const schemaTest = querySchema.safeParse(req.body);

    if(!schemaTest.success){
        return {success: false, data: null, message: "Request Parsing Failed", code: 1001};
    }

    let queryData = schemaTest.data;
    let queriedUsers = [];
    try{
        queriedUsers = await User.findAll({
            attributes: ['id', 'username', 'fname', 'lname'],
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
    let cleanUsers = queriedUsers.map(user => {
      const { id, ...rest } = user.get({ plain: true });
      return {rest, friendOfFriend: true }; // everything except id
    });

    
    return {success: true, data: cleanUsers, message: 'Successful Queried', code: 1000};
}

