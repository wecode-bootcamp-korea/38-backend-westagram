const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const dotenv = require('dotenv');
dotenv.config();

const { DataSource } = require('typeorm');

const appDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
});

appDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  });

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));


app.get('/ping', (req, res) => {
  res.json({ message : 'pong' });
});

// 게시물 등록
app.post('/posts/upload', async (req, res, next) => {
  const { title, post_image, content, user_id  } = req.body;
  
  await appDataSource.query(
    `INSERT INTO posts(
      title,
      post_image,
      content,
      user_id
    ) VALUES (?, ?, ?, ?);
    `,
    [ title, post_image, content, user_id ]
  );

  res.status(201).json({ message : 'postCreated' });
});

// 전체 게시물 조회
app.get('/posts/get', async (req, res) => {  
  await appDataSource.query(
    `SELECT
      p.user_id AS userId,
      u.profile_image AS userProfileImage,
      p.id AS postingId,
      p.post_image AS postingImageUrl,
      p.content AS postingContent
      FROM users u, posts p`
    ,(err, rows) => {
      res.status(200).json({ data : rows });
    }
  );
});

// user 게시물 조회
app.get('/posts/:userId', async (req, res) => {
  const userId = req.params.userId;
  const users = await appDataSource.query(
    `SELECT
      u.id AS userId,
      u.profile_image AS userProfileImage
      FROM users u
      WHERE id=${userId}`
  );
  const posts = await appDataSource.query(
    `SELECT
      p.id AS postingId,
      p.post_image AS postingImageUrl,
      p.content AS postingContent
      FROM posts p
      WHERE user_id=${userId}`
  );
  users[0].postings = posts;
  res.status(200).json({ data : users });
})


const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  server.listen(PORT, () => console.log(`server is listening on ${PORT}`));
}

start();