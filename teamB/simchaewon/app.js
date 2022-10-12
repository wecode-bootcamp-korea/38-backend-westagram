const http = require("http");
const express =require("express");
const cors =require("cors");
const morgan =require("morgan");
require("dotenv").config();


const {DataSource} = require("typeorm");

const weDataSource=new DataSource({
    type:process.env.TYPEORM_CONNECTION,
    host:process.env.TYPEORM_HOST,
    port:process.env.TYPEORM_PORT,
    username:process.env.TYPEORM_USERNAME,
    password:process.env.TYPEORM_PASSWORD,
    database:process.env.TYPEORM_DATABASE
})

weDataSource.initialize()
    .then(()=>{
        console.log("Data Source has been initialized!")
    })
    .catch((err)=>{
        console.error("Error during Data Sources initializaton", err);
        weDataSource.destroy();
    })

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.get("/ping", (req, res)=>{
    res.status(200).json({"message" : "pong"});
})

app.post("/user/signup", async(req, res)=>{
    const {name, userName, userMail, password}=req.body;
    await weDataSource.query(
        "INSERT INTO users (name, user_name, user_mail, password) VALUES (?,?,?,?)",
        [name, userName, userMail, password]
    );
    res.status(201).json({"message":"userCreated"});
})

const server=http.createServer(app);
const PORT = process.env.PORT;

const start = async()=>{
    try{
        server.listen(PORT, ()=>console.log("server is listening on "+PORT));
    } catch(err){
        console.error(err);
    }
};

start();