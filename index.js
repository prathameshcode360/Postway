import express from "express";
import userRouter from "./src/features/users/user.routes.js";

const server = express();

server.use(express.json());

server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send("Welcome to node js server");
});

server.listen(3700, () => {
  console.log("Server is listening on port 3700");
});
