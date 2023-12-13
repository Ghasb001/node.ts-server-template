import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

export const collections: {
  // name after your model
  example?: mongoDB.Collection
} = {}

const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.string, { useUnifiedTopology: true });

export async function connectToDatabase() {
  //create the initial mongoDB client, and await the connection
  await client.connect();
  // create the database const
  const db: mongoDB.Db = client.db(process.env.database);
  // name the collections here
  const data: mongoDB.Collection = db.collection('example');
  // define the export collections
  collections.example = data;
  // log sucessful connections
  console.log(`Successfully connected to database: ${db.databaseName}`);
}

export async function shut() {
  // close connection
  await client.close();
}