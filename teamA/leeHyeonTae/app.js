require('dotenv').config();


const routes = require('./routes');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(routes);

const PORT = process.env.PORT;


app.get('/ping', (req,res) => {
    res.json({ message : 'pong'});
});


const start = async () => {
    try{
        app.listen(PORT, () => console.log(`server is listenging ${PORT}`));
    }
    catch (err){
        console.error(err);
    }
}

start();