//built-in package
const http = require("http");
//3rd-party package
const express = require("express");
const morgan = require("morgan");
const cors=require("cors");
const dotenv = require("dotenv").config();
//custom package
const app = express();
const routes = require("./routes");

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(routes);

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

start();