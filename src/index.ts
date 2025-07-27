import express, { Request, response, Response } from 'express';
import { addUser } from "./services/Auth/auth";
import sequelize from './dbFiles/db';

const app = express();
const port = 3000;

app.use(express.json());
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
    res.send(output);
});




