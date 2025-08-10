import express, { Request, response, Response } from 'express';

import { addUser, login } from "./services/Auth/auth";
import { deleteAccount, logout } from "./services/Signout/signout"
import { queryPeople, addFriend } from "./services/FriendFunctions/friendFunctions"

import sequelize from './dbFiles/db';
import session from 'express-session';
import { constrainedMemory } from 'node:process';

const app = express();
const port = 3000;

app.use(express.json());
app.use(session({
    secret: process.env.SECRET_SESSION_KEY!,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}));


testServer(); //Simply Checks Server Connections
//app.use(express.urlencoded({ extended: true }));




async function testServer() {
    //Test SQL Server Connection
    try {
        await sequelize.authenticate();
        console.log('Connected to DB');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


app.listen(port, () => {
  console.log(`Running Chapp on port ${port}`);
});

app.post('/api/signup', async (req: Request, res: Response) => {
    console.log("Received Sign Up");
    let output = await addUser(req);
    if(!output.success)
        return res.status(400).json(output);
    else
        return res.status(201).json(output);
});

app.post('/api/login', async (req: Request, res: Response) => {
    console.log("Received Login");
    let output = await login(req);
    if(!output.success){
        return res.status(400).json(output);
    }
    else{
       return res.status(201).json(output);
    }
});

app.delete('/api/delete', async (req: Request, res: Response) => {
    console.log("Received Account Deletion");
    let output = await deleteAccount(req);
    if(!output.success){
        return res.status(400).json(output);
    }
    else{
       return res.status(201).json(output);
    }
});

app.delete("/api/logout", async (req: Request, res: Response) => {
    console.log("Received Logout Request");
    let output = await logout(req);
    if(!output.success){
        return res.status(400).json(output);
    }
    else{
        return res.status(201).json(output);
    }
});

app.get("/api/isExpired", (req, res) => {
    console.log("Session Check Requested")
    if (!req.session.userID) {
        console.log("Not Logged in")
        return res.status(401).send('Not logged in');
    }
    else {
        console.log("Still Logged in")
        return res.status(200).send('Still Logged in');
    }
});

app.post("/api/findFriends", async (req, res) => {
    console.log("Searching For New Friends");
    let output = await queryPeople(req);
    if(output.success){
        console.log("Successsfully Queried");
        return res.status(200).json(output);
    }
    else{
        console.error("Failed to Query Friends");
        return res.status(401).json(output);
    }
});

app.post("/api/addFriend", async (req, res) => {
    console.log("Adding A New Friend");
    let output = await addFriend(req);
    if(output.success){
        console.log("Successsfully Added Friend");
        return res.status(200).json(output);
    }
    else{
        console.error("Failed to Add Friends");
        return res.status(401).json(output);
    }
});


