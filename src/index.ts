import express, { Request, Response } from 'express';
import { addUser } from "./services/Auth/auth";


const app = express();
const port = 3000;


app.listen(port, () => {
  console.log(`Running Chapp on port ${port}`);
})





app.get('/api/signup', (req: Request, res: Response) => {
  res.send('Hello World!');
  addUser();
});




