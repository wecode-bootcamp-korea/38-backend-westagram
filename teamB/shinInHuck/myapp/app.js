require('dotenv').dotenv.config();

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

app.get('/posts/get', async (req, res) => {  
  await appDataSource.query(
    `SELECT
      p.user_id AS userId,
      u.profile_image AS userProfileImage,
      p.id AS postingId,
      p.post_image AS postingImageUrl,
      p.content AS postingContent
      FROM users as u, posts as p
      WHERE users.id = posts.user_id`
    ,(err, rows) => {
      res.status(200).json({ data : rows });
    }
  );
});

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  server.listen(PORT, () => console.log(`server is listening on ${PORT}`));
}
start();