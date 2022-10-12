require('dotenv').config();

const http = require('http');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

myDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.get('/ping', function (req, res, next) {
     res.json({message: 'pong'});
});

const PORT = process.env.PORT;

app.listen(PORT, function () {
     console.log('server listening on port 3000');
});
