const dotenv = require("dotenv").config();

const http = require("http");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routers = require("./routers");


const app = express();
const server = http.createServer(app);


app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(routers);

const PORT = process.env.PORT;

app.get("/ping", (req, res, next) => {
  res.json({ message: "pong" });
});

myDataSource.initialize().then(() => {
  console.log("data source has been init");
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
