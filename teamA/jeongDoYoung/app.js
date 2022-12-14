//built-in package
const http = require("http");
//3rd-party package
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { DataSource } = require("typeorm");
//custom package
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT;


const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

myDataSource.initialize().then(() => {
  console.log("data source has been initialized");
});

app.use(cors());
app.use(morgan("dev"));

app.get("/ping", (req, res, next) => {
  res.json({ message: "pong" });
});

const start = () => {
  server.listen(PORT, () => {
    console.log(`connected server ${PORT}`);
  });
};

start();