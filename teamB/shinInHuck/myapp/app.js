const dotenv = require('dotenv').config();

const http = require('http'); 

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { DataSource } = require('typeorm');

const app = express();

const appDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

appDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
        appDataSource.destroy()
    })

const PORT = process.env.PORT;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/ping', (req, res) => {
    res.status(201).json({message: '!! pong !!'});
})

app.post('/posts', async (req, res) => {
	const { title, content, user_id} = req.body

	await appDataSource.query(
		`INSERT INTO posts(
		    title,
		    content,
		    user_id
		) VALUES (?, ?, ?);
		`,
		[ title, content, user_id ]
	); 
     res.status(201).json({ "message" : "postCreated" });
	})

const server = http.createServer(app);

const start = async () => {
    try {
        app.listen(PORT, ()=> console.log(`!!!!!!!!!!!server listening on port ${PORT}!!!!!!!`));
    }
    catch(err){
        console.error(err);
    }
};

start();