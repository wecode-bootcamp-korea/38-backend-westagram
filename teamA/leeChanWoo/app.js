require('dotenv').config()

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

const PORT = process.env.PORT;

const start = async () => {
     try {
       app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
     } catch (err) {
       console.error(err); 
     }
   };
   
start();