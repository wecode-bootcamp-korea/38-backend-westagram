const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config()

const { DataSource } = require('typeorm');
const { title } = require("process");

const database = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
})

database.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
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

  await database.query(
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
  const { title, content, user_id, posting_image } = req.body

  await database.query(
    `INSERT INTO posts(
      title,
      content,
      user_id,
      posting_image
    ) VALUES (?, ?, ?, ?);
    `,
    [ title, content, user_id, posting_image ]
  );
  res.status(201).json({ message : "postCreated" });
})

// Get all posts
app.get("/posts", async (req, res) => {
  await database.manager.query(
    `SELECT
            p.id AS postingId,
            p.user_id AS userId,
            p.posting_image AS postingImageUrl,
            p.title AS postingTitle,
            p.content AS postingContent,
            u.profile_image AS userProfileImage
        FROM posts p
        JOIN users u ON p.user_id=u.id`
    ,(err, rows) => {
      res.status(200).json(rows);
    }
  )
});

// Get posts by user
app.get("/posts/:userId", async (req, res) => {
  const userId = req.params.userId;
  
  const user = await database.manager.query(
    `SELECT
            u.id AS userId,
            u.profile_image AS userProfileImage
        FROM users u
        WHERE id=${userId}`
  );

  const postings = await database.manager.query(
    `SELECT
            p.id AS postingId,
            p.posting_image AS postingImageUrl,
            p.content AS postingContent
        FROM posts p
        WHERE user_id=${userId}`
  );

  user[0].postings = postings;

  return res.status(200).json(user)
});

// Update a post
app.patch("/posts/:userId/:postId", async (req, res) => {
  const userId = req.params.userId;
  const postId = req.params.postId;

  const { title, content } = req.body

  await database.manager.query(
    `UPDATE posts
    SET
      title=?,
      content=?
    WHERE user_id=${userId} AND id=${postId}`,
    [ title, content ]
  );
  
  const result = await database.manager.query(
    `SELECT
            p.user_id AS userId,
            u.name AS userName,
            p.id AS postingId,
            p.title AS postingTitle,
            p.content AS postingContent
        FROM posts p
        JOIN users u ON p.user_id=u.id
        WHERE p.user_id=${userId} AND p.id=${postId}`
  );

  return res.status(201).json(result);
})

const server = http.createServer(app)
const PORT = process.env.PORT;

const start = async () => {
  server.listen(PORT, () => console.log(`server is listening on ${PORT}`))
}

start()