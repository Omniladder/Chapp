import express from 'express';
import { google } from 'googleapis';

import GoogleSchema from './googleLoginSchema';
import GoogleTokenSchema from './googleTokenSchema';
import { User } from "../../models/userSchema";


const HOME_ADDRESS = process.env.FRONTEND_SITE_URL + "/"
const REDIRECT_URI = process.env.BACKEND_SITE_URL + "/api/googleToken"
const googleClient = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_ID,
    process.env.GOOGLE_OAUTH_SECRET,
    REDIRECT_URI
);


export async function googleAuth(req: express.Request, res: express.Response){
    
    const googleURL = googleClient.generateAuthUrl({
        access_type: 'offline',
        scope: ['profile', 'email'],
        redirect_uri: REDIRECT_URI
    }) 

    res.redirect(googleURL)
}

export async function googleToken(req: express.Request, res: express.Response){
    // Get Information on Google Account

    const authData = GoogleTokenSchema.safeParse(req.query)

    if (!authData.success) {
        console.log("Failed to Parse Auth Data");
        return res.status(400).json({ error: "Missing or invalid query params" });
    }
    
    const {code} = authData.data

    const { tokens } = await googleClient.getToken(code)
    googleClient.setCredentials(tokens)

    const oauth2 = google.oauth2({ auth: googleClient, version: 'v2'})
    const { data } = await oauth2.userinfo.get()

    //Get User
    let dbUser = await User.findOne({where: {googleID: data.id}});
    if(!dbUser) {
        const { id, email, given_name, family_name } = data;
        const user = { googleID: id, email: email, fname: given_name, lname: family_name, username: email!.split("@")[0]}
        dbUser = await User.create(user)
    }

    req.session.userID = dbUser.id;

    res.redirect(HOME_ADDRESS);
}


