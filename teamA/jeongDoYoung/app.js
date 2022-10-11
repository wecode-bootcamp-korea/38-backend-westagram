require("dotenv").config();
//built-in package
const http = require("http");
//3rd-party package
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
//custom package
const app = express();
const routes = require("./routes");
const routes = require("./routes");
const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
  type: process.env.TYPOEORM_CONNECTION,
  host: process.env.TYPOEORM_HOST,
  port: process.env.TYPOEORM_PORT,
  username: process.env.TYPOEORM_USERNAME,
  password: process.env.TYPOEORM_PASSWORD,
  database: process.env.TYPOEORM_DATABASE
});
myDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  }); 
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
//[GET] 통신 heath check code
app.get('/ping', async (req, res) => {
  res.json({ "message" : "pong" });
});

//[POST] user sign up code
app.post('/signup', async (req, res) => {
  const { name, email, profile_image, password } = req.body;

  await myDataSource.query(
    `
    INSERT INTO users (
      name,
      email,
      profile_image,
      password
    ) VALUES ( ?, ?, ?, ? );
    `,
    [ name, email, profile_image, password ]
  );
  res.status(201).json({ "message" : "userCreated" });
});

const server = http.createServer(app);
const PORT = process.env.PORT;
const start = async () => {
  server.listen(PORT, () => console.log(`server is listening on ${PORT}`));
};
start();