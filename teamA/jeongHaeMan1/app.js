require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan(''));
app.use(routes);

app.get("/ping", (req, res) => {
    res.status(200).json({ message : "pong"})
});

const PORT = process.env.PORT;
const server = http.createServer(app);

const start = async () => {
    try {
        server.listen()

    } catch (err) {
        console.error(err)
    }
}
