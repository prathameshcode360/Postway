import express from "express";

const server = express();

server.get("/", (req, res) => {
  res.send("Welcome to node js server");
});

server.listen(3700, () => {
  console.log("Server is listening on port 3700");
});
