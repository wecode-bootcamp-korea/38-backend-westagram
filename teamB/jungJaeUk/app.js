const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const dotenv = require('dotenv');
dotenv.config();

const { DataSource } = require('typeorm');

const mysqlDataSource = new DataSource({
  type: process.env.TYPOEORM_CONNECTION,
  host: process.env.TYPOEORM_HOST,
  port: process.env.TYPOEORM_PORT,
  username: process.env.TYPOEORM_USERNAME,
  password: process.env.TYPOEORM_PASSWORD,
  database: process.env.TYPOEORM_DATABASE
});

mysqlDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  });

const app = express(); 

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/ping', async (req, res) => {
  res.json({ "message" : "pong" });
});

app.get('/posts/list/all', async (req, res) => {
  const result = await mysqlDataSource.query(`
    SELECT
      users.id as userId,
      users.profile_image as userProfileImage,
      posts.id as postingId,
      posts.profile_url as postingImageUrl,
      posts.content as postingContent
    FROM users
    INNER JOIN posts ON users.id = posts.user_id;`
    );

  res.status(200).json({ "data" : result });
});

app.get('/user/userid/posts', async (req, res) => {
  const { id } = req.body;

  await Promise.all([
    mysqlDataSource.query(`
      SELECT
        posts.id as postingId,
        posts.profile_url as postingImageUrl,
        posts.content as postingContent
      FROM posts
      WHERE user_id=${id};`
    ),
    mysqlDataSource.query(`
      SELECT
        users.id as userId,
        users.profile_image as userProfileImage
      FROM users
      WHERE id=${id};`
    )
  ]).then(function([postingsResult, userResult]) {
    userResult[0]['postings'] = postingsResult;
    res.status(200).json({ "data" : userResult[0] });
  }, function(err) {
    return console.log(err);
  });
});

app.post('/signup', async (req, res) => {
  const { name, email, profile_image, password } = req.body;

  await mysqlDataSource.query(`
    INSERT INTO users
      (
      name,
      email,
      profile_image,
      password
      )
    VALUES ( ?, ?, ?, ? );`,
    [ name, email, profile_image, password ]
  );
  res.status(201).json({ "message" : "userCreated" });
});

app.post('/posts', async (req, res) => {
  const { title, content, user_id } = req.body;

  await mysqlDataSource.query(`
    INSERT INTO posts
      (
      title,
      content,
      user_id
      )
    VALUES ( ?, ?, ? );`,
    [ title, content, user_id ]
  );

  res.status(201).json({ "message" : "postCreated" });
});

app.post('/posts/update', async (req, res) => {
  const { user_id, post_id, content } = req.body;

  await Promise.all([
    await mysqlDataSource.query(`
      UPDATE posts
      SET content="${content}"
      WHERE user_id=${user_id} AND id=${post_id};`
    ),
    mysqlDataSource.query(`
      SELECT
        users.id as userId,
        users.name as userName,
        posts.id as postingId,
        posts.title as postingTitle,
        posts.content as postingContent
      FROM users
      INNER JOIN posts ON users.id = posts.user_id
      AND users.id=${user_id} AND posts.id=${post_id};`
    )
  ]).then(function([updateResult, postResult]) {
    res.status(200).json({ "data" : postResult });
  }, function(err) {
    return console.log(err);
  });
});

app.post('/posts/like', async (req, res) => {
  const { post_id, user_id } = req.body;

  await mysqlDataSource.query(`
    INSERT INTO likes
      (
      user_id,
      post_id
      )
    VALUES (${user_id}, ${post_id});`
  );
  res.status(200).json({ "message" : "likeCreate" });
});

app.delete('/posts/delete', async (req, res) => {
  const { post_id } = req.body;

  await mysqlDataSource.query(`
    DELETE
    FROM posts
    WHERE id=${post_id};`
  );
  res.status(200).json({ "data" : "postingDelete" });
});

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  server.listen(PORT, () => console.log(`server is listening on ${PORT}`));
};

start();