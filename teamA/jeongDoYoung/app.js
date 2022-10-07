const http = require("http");
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();      

const { DataSource } = require('typeorm')

const myDataSource = new DataSource({              
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
app.post("/users", async (req,res) => {
    const { name, email, password} = req.body
        await myDataSource.query(
            `INSERT INTO users(
                name,
                email,
                password
            ) VALUES (?, ?, ?);
            `,
            [ name , email , password]
        ); 
         res.status(201).json({ message : "userCreated" });
        })
    

const server = http.createServer(app);
const PORT  = process.env.PORT;

const start = async () =>{
    server.listen(PORT , () => console.log(`server is listening on ${PORT}`))
}

start();