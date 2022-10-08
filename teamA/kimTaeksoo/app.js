const dotenv = require("dotenv").config();

const http = require("http");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./router");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(router);

app.get("/ping", (req, res, next) => {
  res.json({ message: "success" });
});

const start = () => {
  server.listen(PORT, () => {
    console.log(`Open Server with ${PORT}`);
  });
};

start();
