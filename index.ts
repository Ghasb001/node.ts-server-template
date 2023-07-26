import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {connectToDatabase, collections} from './mongo';
import Leaders from "./models/leaders";
import TipsAndTricks from "./models/tipsTricks";
import Resources from "./models/resources";
dotenv.config();

const app: Express = express();

// Parse JSON payloads
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.sendStatus(200);
});

connectToDatabase();

app.get('/leaders', async (req: Request, res: Response) => {
  try {
    const leads = (await collections.leaders.find({}).toArray()) as Leaders[];
    leads.sort((a, b) => a.priority - b.priority)
     res.status(200).send(leads);
 } catch (error) {
     res.status(500).send(error.message);
 }
});

app.get('/tipstricks', async (req: Request, res: Response) => {
  try {
    const tip = (await collections.tipstricks.find({}).toArray()) as TipsAndTricks[];
     res.status(200).send(tip);
 } catch (error) {
  console.log(error)
     res.status(500).send(error.message);
 }
});

app.get('/resources', async (req: Request, res: Response) => {
  var sorted = {
    provider: [],
    community: [],
  };
  try {
    const resc = (await collections.resources.find({}).toArray()) as Resources[];
    resc.forEach((x) => {
      if (x.type === 'ABA Provider') { sorted.provider.push(x)}
      else if (x.type === 'Community Resource') { sorted.community.push(x)}
    })
     res.status(200).send(sorted);
 } catch (error) {
  console.log(error)
     res.status(500).send(error.message);
 }
});


const port = process.env.PORT || 1128;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});