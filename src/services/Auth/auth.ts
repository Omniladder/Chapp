import { Request } from "express";
import signupSchema from "./signupSchema";
import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";

// DB ORM Object
import sequelize from "../../dbFiles/db";
import { User } from "../../models/userSchema";
import { success } from "zod";


function hashPassword(password: string){
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    console.log("Hashed new Passsword");
    return hash;
}


/**
    * User Adding Functionality
*/
export async function addUser(req: Request){
    
    //Simple Schema Validation
   const schemaTest = signupSchema.safeParse(req.body); 

   if(!schemaTest.success) {
        console.error("Failed Schema Parsing \n");
        console.error(schemaTest.error);
        return {success: false, message: "Failed to Parse schema", error: schemaTest.error, code: 1001};
   }

    console.log("Successfully Parsed Incoming Request");
    const userData = schemaTest.data;

    //Check if User already in Database
    const dupUser = await User.findOne({ where: {"username": userData.username}}); 
    
    if(dupUser){
        console.log("Username Already In Use");
        return {success: false, message: "Username Already In Use", code: 1003};
    }


    // Password Hashing
    const hash = hashPassword(userData.password);

    console.log("New Hash: ", hash);

    if(compareSync(userData.password, hash)){
        console.log("Passwords Line up");
    }else{
        console.error("Hashing Failed Hash & Password Dont align");
        return {success: false, message: "Hashing Failed", code: 1004};
    }

    //Save User Data
    await User.create({
        "fname" : userData.fname,
        "lname" : userData.lname,
        "username" : userData.username,
        "password" : hash,
        "email" : userData.email
    })

    console.log("Added New User to Database");
    console.log("\n\n\n");

    return {success: true, message: "Successfully Added Account", code: 1000}
}


export function login(req: Request){
    console.log("Received a Request");
    console.log(req.body);
}



