require('dotenv').config()

const http = require('http');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const routes = require("./routers");
app.use(routes);


app.get("/ping", (req, res) => {
     res.json({ message : "pong" });
});


const server = http.createServer(app); // ???
const PORT = process.env.PORT;

const start = async () => {
     try {
       app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
     } catch (err) {
       console.error(err); 
     }
   };
   
start();