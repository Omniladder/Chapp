import express, { Request } from 'express';
import { User } from "../../models/userSchema";
import session from 'express-session';
import { success } from 'zod';
import { resolve } from 'path';

export async function deleteAccount(req: Request) {
    const userID = req.session.userID;

    if(!userID){
        console.error("Failed to Find User ID");
        console.error(req.body);
        return {success: false, message: "Failed to find ID Please Retry.", code: 1001};
    }
    
    // Delete Account from Database 
    // TODO: Make sure all data relating to user is deleted ie. friends etc
    try{
        await User.destroy({ where: { id: userID } });
        console.log("Deleted User. ID=", userID);
    }
    catch(err){
        console.error("Failed to Delete account Error: ", err);
        return {success: false, message: "Account Deletion Failed, Please Try Again Later.", code: 1002};
    }

    //Logout the user session
    let logoutResponse = await logout(req);
    if(logoutResponse.success) {
        return {success: true, message: "Successfully Added Account", code: 1000}
    }
    else {
        return {success: false, message: "Logout Failed", code: 1003};
    }
}

export async function logout(req: Request): Promise<{success: boolean, message: string, code: number}>{
    return new Promise((resolve) => {
        req.session.destroy(err => {
            if(err){
                console.error("Failed to Logout User");
                resolve({success: false, message: "Failed to Logout User", code:1001});
            }
            else{
                console.log("Logged out User");
                resolve({success: true, message: "Logged Out User", code:1000});
            }
        });
    });
}

