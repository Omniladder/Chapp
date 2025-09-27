import express from 'express';
import { google } from 'googleapis';

import GoogleSchema from './googleLoginSchema';
import GoogleTokenSchema from './googleTokenSchema';
import { User } from "../../models/userSchema";


const GOOGLE_REDIRECT_URI = process.env.BACKEND_SITE_URL + "/api/googleToken"
const HOME_ADDRESS = process.env.FRONTEND_SITE_URL + "/"

// Clients
const googleClient = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_ID,
    process.env.GOOGLE_OAUTH_SECRET,
    GOOGLE_REDIRECT_URI
);

//const githubClient = 








// Google Authentication
export async function googleAuth(req: express.Request, res: express.Response){
    
    const googleURL = googleClient.generateAuthUrl({
        access_type: 'offline',
        scope: ['profile', 'email'],
        redirect_uri: GOOGLE_REDIRECT_URI
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


const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_SECRET_ID;

// Github Authentication
export async function githubAuth(req: express.Request, res: express.Response){
    const REDIRECT_URI = process.env.BACKEND_SITE_URL + "/api/githubToken";
    
    const GH_BASE_URL = "https://github.com/login/oauth/authorize";
    const REDIRECT_QUERY = "&redirect_uri=" + encodeURIComponent(REDIRECT_URI);
    const CLIENT_QUERY = "?client_id=" + GITHUB_CLIENT_ID;
    const SCOPE_QUERY = "&scope=user:email";

    const githubURL = GH_BASE_URL + CLIENT_QUERY + REDIRECT_QUERY + SCOPE_QUERY;

    console.log("Github URL: ", githubURL);

    res.redirect(githubURL)
}

export async function githubToken(req: express.Request, res: express.Response) {

    const REDIRECT_URI = process.env.BACKEND_SITE_URL + "/api/githubToken";
    const authData = GoogleTokenSchema.safeParse(req.query);

    if (!authData.success) {
        console.log("Failed to Parse Auth Data");
        return res.status(400).json({ error: "Missing or invalid query params" });
    }
 
    const { code } = authData.data
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI,
        }),
    });


    const tokenData = await tokenResponse.json();
    console.log("Client ID: ", GITHUB_CLIENT_ID);
    console.log("Client Secret: ", GITHUB_CLIENT_SECRET)
    console.log("Token Data: ", tokenData);
    const accessToken = tokenData.access_token;

    const user = await getGithubUser(accessToken);
    let dbUser = await User.findOne({where: {githubID: user.githubID}});
    if(!dbUser) {
        dbUser = await User.create(user);
    }

    req.session.userID = dbUser.id;
    res.redirect(HOME_ADDRESS);
}

async function getGithubUser(accessToken: string) {
    const newUserResponse = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      });
     
    const user = await newUserResponse.json();

    const emailResponse = await fetch("https://api.github.com/user/emails", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      });

    const emails = await emailResponse.json()
    console.log(emails);
    const primaryEmail = emails.find((e: any) => e.primary)?.email || null;
    console.log("User Name: ", user.name);
    console.log(user.name?.split(" "));
    const dbUser = {
        githubID: user.id.toString(),
        username: user.login,
        fname: user.name?.split(" ")[0] || null,
        lname: user.name?.split(" ")[1] || null,
        email: primaryEmail,
    };


    return dbUser;
}













