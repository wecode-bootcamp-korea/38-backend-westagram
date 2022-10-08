require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { DataSource } = require('typeorm');
const app = express();
const PORT = process.env.PORT;
const appDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
})
appDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!")
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err)
      appDataSource.destroy()
    })
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());



app.post('/posts',async (req,res) => {
    const { title, content, posting_image,user_id} = req.body;

    await appDataSource.query(
        `INSERT INTO posts(
            title,
            content,
            posting_image,
            user_id
        ) VALUES ( ?,?,?,? );`
        ,
        [ title, content, posting_image, user_id ]
    );
    res.status(201).json({message: "postCreated"});
})
app.get('/search' ,async (req,res) => {

  await appDataSource.query(
    `SELECT
            posts.id as userId ,
            users.profile_image as userProfileImage,
            posts.id as postingId,
            posts.posting_image as postingImageUrl,
            posts.content as postingContent
            FROM (users, posts)
            WHERE users.id=posts.user_id;
            `
  ,
  (err,row) => {
  res.status(201).json({data: row });
  });
});

app.get('/specific' , async (req,res) => {
//     let postings = async () => {
      
//       return await appDataSource.query(`
//     SELECT
//             posts.id as postingId,
//             posts.posting_image as postingImageUrl,
//             posts.content as postingContent
//             FROM posts,users
//             WHERE users.id=posts.user_id`
//     )
// }
// postings();

    await appDataSource.query(
    `
    SELECT 
            id as userId,
            profile_image as userProfileImage,
            FROM users;
    `
    ,
    (err,row) => {
      res.status(202).json({ data:row });
    });
});

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
}
start();
