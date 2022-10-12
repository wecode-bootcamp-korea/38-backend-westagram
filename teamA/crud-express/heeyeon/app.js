const http = require('http');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const routes = require('./routes');

myDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!')
    });

const app = express()

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.use(routes);

app.get('/ping', function (req, res) {
    res.status(200).json({ message : 'pong'})
});


const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
    } catch (err) {
        console.log(err);
    }
};

start()
