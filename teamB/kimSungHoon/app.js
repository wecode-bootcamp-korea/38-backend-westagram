require('dotenv').config();

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

app.post('/users', async (req,res) => {
    const { name, email, profile_image, password } = req.body
    
    await appDataSource.query(
        `INSERT INTO users(
            name,
            email,
            profile_image,
            password
        ) VALUES (?, ?, ?, ?);
        `,
        [name, email, profile_image, password]
    )
    res.status(201).json({"message" : "userCreated"});
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

app.get('/posts-with-users', async (req, res) => {

    appDataSource.query(
	    `SELECT 
            users.id AS userId,
            users.profile_image AS userProfileImage,
            posts.id AS postingId,
            posts.title AS postingTitle,
            posts.content AS postingContent
        FROM users
        INNER JOIN posts ON posts.user_id = users.id
        `,
        (err, data) => {
        res.status(200).json({"data" : data});
	});
})

app.get('/posts-from-user/:userid', async (req,res)=>{

    const userid  = parseInt(req.params.userid);

    await Promise.all([
        appDataSource.query(
            `SELECT
                posts.id AS postingId,
                posts.title AS postingTitle,
                posts.content AS postingContent
            FROM posts
            WHERE user_id= ${userid};
            `, 
        ),
        appDataSource.query(
            `SELECT
                users.id AS userId,
                users.profile_image AS userProfileImage
            FROM users
            WHERE id = ${userid};
            `
        )])
        .then(([postingsResult, userResult])=>{
            userResult[0]['postings'] = postingsResult;
            res.status(200).json({ "data" : userResult[0] });
        })
    
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