require("dotenv").config();
//built-in package
const http = require("http");
//3rd-party package
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
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
  database: process.env.TYPEORM_DATABASE
});

myDataSource.initialize().then(() => {
  console.log("data source has been initialized");
});

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.post('/signup', async (req, res) => {
  const {name,email,profile_image,password} = req.body
  await myDataSource.query(`
    INSERT INTO users (
      name,
      email,
      profile_image,
      password
    ) VALUES ( ?, ?, ?, ? );`,
    [ name, email, profile_image, password ]
  );
  res.status(201).json({ "message" : "userCreated" });
});

const start = () => {
  server.listen(PORT, () => {
    console.log(`connected server ${PORT}`);
  });
};

start();