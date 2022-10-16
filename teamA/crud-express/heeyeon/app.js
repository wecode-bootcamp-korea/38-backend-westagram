require('dotenv').config();

const http = require('http');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const {globalErrorhandler} = require('./utils/error');

const app = express()

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.use(routes);
app.use({globalErrorhandler});

app.get('/ping', function (req, res) {
    res.status(200).json({ message : 'pong'})
});

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
    try {
        server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
    } catch (err) {
        console.log(err);
    }
};

start()
