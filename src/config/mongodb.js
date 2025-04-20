import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/postway";
let client;
export async function connectToDatabase() {
  try {
    client = new MongoClient(url);
    await client.connect();
    console.log("database connectes successfully");
  } catch (error) {
    console.log("database connection failed", error);
  }
}

export async function getDB() {
  if (!client) {
    return await connectToDatabase();
  } else {
    return client.db();
  }
}
