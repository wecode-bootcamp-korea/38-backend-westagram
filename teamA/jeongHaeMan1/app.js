require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');

const myDataSource = require("./utils/typeorm");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(routes);

app.get("/ping", (req, res) => {
    res.status(200).json({ message : "pong"})
});

const PORT = process.env.PORT;

const startServer = async () => {
    try {
        myDataSource.initialize()
        .then(() => {
            console.log("Data Source has been initialized!");
        })
        .catch((err) => {
            console.error("Error during Data Source initialization", err);
            myDataSource.destroy();
        })
        
        app.listen(PORT, () => 
            console.log(`server is listening on ${PORT}`))
    } catch (err) {
        console.log(err);
    }
}

startServer()