const http = require("http");
const express =require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const {DataSource}=require("typeorm");

const myDataSource = new DataSource(
    {
    type:process.env.TYPEORM_CONNECTION,
    host:process.env.TYPEORM_HOST,
    port:process.env.TYPEORM_PORT,
    username:process.env.TYPEORM_USERNAME,
    password:process.env.TYPEORM_PASSWORD,
    database:process.env.TYPEORM_DATABASE
})

myDataSource.initialize()
    .then(()=>{
        console.log("Data Source has been initialized!");
    }) 
    .catch((err)=>{
            console.error("Error during Data Sources initialization");
            myDataSource.destroy();
    });

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.get("/ping",(req, res)=>{
    res.status(200).json({"message":"pong"});
})

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async()=>{
    try{
        server.listen(PORT, ()=>{
            console.log("SERVER IS LISTENING ON "+PORT);
        })
    } catch(err){
        console.error(err);
    }
};
    start();