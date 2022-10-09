require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    database: process.env.TYPEORM_DATABASE
})

myDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized")
    })
    .catch((err) => {
        console.error("Error during Data Source initializtion", err)
        myDataSource.destroy()
    })

app = express();

app.use(express.json());
app.use(cors());
app.use(morgan(''));

app.get("/ping", (req, res) => {
    res.json({message : "pong"})
});

const PORT = process.env.PORT;

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`server is listening on ${PORT}`)
        })
    } catch (err) {
        console.error(err)
    }
};

start();