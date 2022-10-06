const http = require("http");
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();        //환경변수에 적어뒀던 수많은 typeorm과 관련된 수많은 내용들을 app.js에서 사용할 수 있게 만듬

const { DataSource } = require('typeorm')

const myDataSource = new DataSource({               // .env숨긴파일에서 관련된 변수 value들을 긁어올 수 있게 설정
    type : process.env.TYPEORM_CONNECTION,
    host : process.env.TYPEORM_HOST,
    port : process.env.TYPEORM_PORT,
    username : process.env.TYPEORM_USERNAME,
    password : process.env.TYPEORM_PASSWORD,
    database : process.env.TYPEORM_DATABASE
})

myDataSource.initialize()
 .then(() => {
    console.log("Data Source has been initialized!")
 })

app = express();


app.use(express.json());
app.use(cors());
app.use(morgan(''));


app.get("/ping", (req,res) => {
    res.json({message : "pong"})
})
const server = http.createServer(app);
const PORT  = process.env.PORT;

const start = async () =>{
    server.listen(PORT , () => console.log(`server is listening on ${PORT}`))
}

start();