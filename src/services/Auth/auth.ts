import { Request } from "express";

import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";

// Request Validation Schemas
import signupSchema from "./signupSchema";
import loginSchema from "./loginSchema"

// DB ORM Object
import { User } from "../../models/userSchema";


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
        return {success: false, message: "Invalid Input. Make sure username & Password are at least 5 characters", error: schemaTest.error, code: 1001};
   }

    console.log("Successfully Parsed Incoming Request");
    const userData = schemaTest.data;

    //Check if User already in Database
    const dupUser = await User.findOne({ where: {"username": userData.username}}); 
    
    if(dupUser){
        console.log("Username Already In Use");
        return {success: false, message: "Username Already In Use. Please try different Username.", code: 1002};
    }


    // Password Hashing
    const hash = hashPassword(userData.password);

    console.log("New Hash: ", hash);

    if(compareSync(userData.password, hash)){
        console.log("Passwords Line up");
    }else{
        console.error("Hashing Failed Hash & Password Dont align");
        return {success: false, message: "Hashing Failed. Please Retry.", code: 1003};
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


export async function login(req: Request){
    console.log("Received a Request");

    const schemaTest = loginSchema.safeParse(req.body);

    if(!schemaTest.success){
        return {success: false, message: "Parsing Failed Please Retry", code: 1003};
    }

    const userData = schemaTest.data;

    const queriedUser = await User.findOne({ where: {"username": userData.username}}); 

    if(!queriedUser){
        return {success: false, message: "Invalid Username", code: 1001};
    }


    if(compareSync(userData.password, queriedUser.password)){
        req.session.username = userData.username;
        return {success: true, message: "Logged In :)", code: 1000}
    }
    else {
        return {success: false, message: "Invalid Password", code: 1002}
    }
}



