require('dotenv').config();
const http = require('http');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./routes');
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(routes);

app.get('/ping', (req, res) => {
    res.status(201).json({message: 'pong 연결 완료 '});
});

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
    try {
        server.listen(PORT, ()=> console.log(`!!!!!!!!!!!server listening on port ${PORT}!!!!!!!`));
    }
    catch(err){
        console.error(err);
    }
};

start();