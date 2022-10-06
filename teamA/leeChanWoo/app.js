const http = require('http');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv').config();

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

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());


// health cheak
app.get('/ping', function (req, res, next) {
     res.json({message: 'pong'});
});

// sign-up
app.post('/users', async (req, res) => {
	const { name, email, profile_image, password } = req.body
    
	await myDataSource.query(
		`INSERT INTO users(
		    name,
		    email,
            profile_image,
            password
		) VALUES (?, ?, ?, ?);
		`,
		[ name, email, profile_image, password ]
	); 
     res.status(201).json({ message : "userCreated" });
});


// posts에 게시글 등록
app.post('/posts', async (req, res) => {
	const { title, content, user_id } = req.body
    
	await myDataSource.query(
		`INSERT INTO posts(
		    title,
		    content,
            user_id
		) VALUES (?, ?, ?);
		`,
		[ title, content, user_id ]
	); 
     res.status(201).json({ message : "postCreated" });
});

// 전체 게시글 조회하기
app.get('/posts', async(req, res) => {
    await myDataSource.query(
	`SELECT 
            users.id AS userId,
            users.profile_image AS userProfileImage,
            posts.id AS postingId,
            posts.title AS postTitle,
            posts.content AS postingContent
        FROM posts
        INNER JOIN users ON users.id=posts.user_id`
		,(err, rows) => {
      res.status(200).json(rows);
	});
});





const PORT = process.env.PORT;

app.listen(PORT, function () {
     console.log('server listening on port 3000');
});
