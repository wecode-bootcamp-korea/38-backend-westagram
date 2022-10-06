const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const morgan = require('morgan');


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const { DataSource } = require('typeorm');

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


app.post('/signup' , async (req,res) => {
      const {name,email,profile_image,password} = req.body;

      await appDataSource.query(
        `INSERT INTO users(
          name,
          email,
          profile_image,
          password
          ) VALUES (?,?,?,?)
         ` ,
         [name,email,profile_image,password]
      );
      res.status(201).json({message : 'user created'});
})

app.post('/posts' , async (req,res) => {
  const {title,content,user_id} = req.body;

  await appDataSource.query(
    `INSERT INTO posts(
      title,
      content,
      user_id) VALUES (?,?,?)
      `,
      [title,content,user_id]
  );
  res.status(200).json({message :'post Created'});
})


const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
}
start();