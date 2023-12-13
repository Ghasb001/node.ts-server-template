import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
// DBMS connection imports
import Pool from './postgres/db';
import { connectToDatabase, collections } from './mongo/mongo';
// mongo models
import Example from './mongo/models/example';

dotenv.config();

const app: Express = express();

// Parse JSON payloads
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.sendStatus(200);
});

// mongoDB connection function
connectToDatabase();

app.get('/pgExample', async (req: Request, res: Response) => {
  Pool.query("SELECT * FROM example_table")
  .then((data: any) => res.send(data.rows).status(201))
  .catch((err: any) => res.sendStatus(500))
})

app.get('/mongoExample', async (req: Request, res: Response) => {
  try {
    const info = (await collections.example.find({}).toArray()) as Example[];
    res.status(200).send(info);
  } catch (error) {
    res.status(500).send(error.message);
  }
});



const port = process.env.PORT || 1128;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});