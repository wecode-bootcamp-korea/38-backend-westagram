const http = require("http");
const express =require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const {DataSource} = require("typeorm");
const { json } = require("express");

const weDataSource = new DataSource({
    type:process.env.TYPEORM_CONNECTION,
    host:process.env.TYPEORM_HOST,
    port:process.env.TYPEORM_PORT,
    username:process.env.TYPEORM_USERNAME,
    password:process.env.TYPEORM_PASSWORD,
    database:process.env.TYPEORM_DATABASE
})

weDataSource.initialize()
    .then(()=>{
        console.log("Data Source has been initialized!!!!");
    }) .catch((err)=>{
        console.error(err);
        weDataSource.destroy();
    });

app.get("/ping",(req, res)=>{
    res.status(200).json({"message":"pong"});
});

app.post("/user/signup", async(req, res)=>{
    const {name, email, password}=req.body;
    await weDataSource.query(
        "INSERT INTO users (name, email, password) VALUES(?,?,?)",
        [name, email, password]
    );
    res.status(201).json({"message":"userCreate"});

});

app.get("/posts", async(req, res)=>{
    weDataSource.query(
        `SELECT users.id AS userId, users.user_profile_image, posts.id AS postID, posts.post_profile_image, posts.content AS PostingContent FROM users, posts where users.name=posts.user_name;`
        ,function(err, rows){
        res.status(200).json({"data":rows});
    });
})

app.post("/posts", async(req, res)=>{
    const {title, content, userName}=req.body;
    await weDataSource.query(
        "INSERT INTO posts (title, content, user_name) VALUES (?,?,?)",
        [title, content, userName]
        );
     res.status(200).json({"message":"postCreated"});
});


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
}

start();