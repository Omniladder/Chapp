import express, { Request, response, Response } from 'express';
import { addUser, login } from "./services/Auth/auth";
import sequelize from './dbFiles/db';
import session from 'express-session';

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



