const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const dotenv = require('dotenv');
dotenv.config();

const routes = require("./routes");

const app = express(); 

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(routes);

app.get('/ping', async (req, res) => {
  res.json({ "message" : "pong2" });
});

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  server.listen(PORT, () => console.log(`server is listening on ${PORT}`));
};

start();