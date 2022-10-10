const http=require("http");
const express=require("express");
const cors=require("cors");
const morgan=require("morgan");

require("dotenv").config();

const {DataSource} = require("typeorm");

const westa_DB= new DataSource({
    type:process.env.TYPEORM_CONNECTION,
    host:process.env.TYPEORM_HOST,
    username:process.env.TYPEORM_USERNAME,
    password:process.env.TYPEORM_PASSWORD,
    database:process.env.TYPEORM_DATABASE,
    port:process.env.TYPEORM_PORT
});

westa_DB.initialize()
    
    .then(()=>console.log("DATABASE has been initialized!"))

    .catch((err)=>{
        console.error("ERROR DURING INITIALIZATION "+ err)
        westa_DB.destroy();
    });




const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


app.get("/ping",(req, res)=>{
    res.status(200).json({"message":"PONG!"});
})

const server = http.createServer(app);
const PORT = process.env.PORT;

const start=()=>{

    try{
        server.listen(PORT, ()=>{console.log(`SERVER IS LISTENING ON PORT : ${PORT}`) });
    }

    catch(err){
        console.error(err);
    }
}

start();