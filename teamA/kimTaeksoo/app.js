const dotenv = require("dotenv").config();

const http = require("http");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { DataSource } = require("typeorm");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const PORT = process.env.PORT;
const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

myDataSource
  .initialize()
  .then(() => {
    console.log(`mysql database init`);
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/ping", (req, res, next) => {
  res.json({ message: "pong" });
});

app.post("/sign-up", async (req, res, next) => {
  const { name, email, profile_image, password } = req.body;

  await myDataSource.query(
    `INSERT INTO users (
      name, 
      email, 
      profile_image, 
      password
      ) VALUES (?, ?, ?, ?)`,
    [name, email, profile_image, password]
  );

  res.status(201).json({ message: "userCreated" });
});

const start = () => {
  try {
    server.listen(PORT, () => {
      console.log(`open server PORT:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
