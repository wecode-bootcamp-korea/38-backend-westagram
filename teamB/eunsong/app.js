require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));
app.use(routes);

// health check
app.get("/ping", (req, res) => {
  res.json({ message : "pong" });
});

const server = http.createServer(app)
const PORT = process.env.PORT;

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
}

start()