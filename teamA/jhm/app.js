require('dotenv').config();

const http = require('http');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

myDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initalization", err)
    myDataSource.destroy()
    })
    
app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

app.get("/ping", (req, res) => {
    res.json({ message: "pong" });
});

app.post("/users", async (req, res) => {
    const { name, profileImage, userId, password } = req.body

    await myDataSource.query(
            `INSERT INTO users (
                name, 
                profileImage, 
                userId, 
                password
            ) VALUES (?, ?, ?, ?);`,
            [name, profileImage, userId, password]
    );
    
    res.status(201).json({message : "successfully created"});
})

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
    try {
    app.listen(PORT, () => console.log(`server is listening on ${PORT}`))
    } catch (err) {
        console.error(err);
    }
};

start()