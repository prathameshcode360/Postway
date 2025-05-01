import mongoose from "mongoose";

const url = "mongodb://localhost:27017/postway";

export async function connectWithMongoose() {
  try {
    await mongoose.connect(url);
    console.log("Database connected successfully with mongoose");
  } catch (error) {
    console.log("Error while connecting to database", error);
  }
}
