const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config()

const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
})

myDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  });

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

// health check
app.get("/ping", (req, res) => {
  res.json({ message : "pong" });
});

// Create a user
app.post("/users", async (req, res, next) => {
  const { name, email, profile_image, password } = req.body

  // console.log(req)

  await myDataSource.query(
    `INSERT INTO users(
      name,
      email,
      profile_image,
      password
    ) VALUES (?, ?, ?, ?);
    `,
    [ name, email, profile_image, password ]
  );
      res.status(201).json({ message : "userCreated" });
})

// Create a post
app.post("/posts", async (req, res, next) => {
  const { title, content, user_id } = req.body

  await myDataSource.query(
    `INSERT INTO posts(
      title,
      content,
      user_id
    ) VALUES (?, ?, ?);
    `,
    [ title, content, user_id ]
  );
      res.status(201).json({ message : "postCreated" });
})

const server = http.createServer(app)
const PORT = process.env.PORT;

const start = async () => {
  server.listen(PORT, () => console.log(`server is listening on ${PORT}`))
}

start()