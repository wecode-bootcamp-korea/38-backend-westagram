require('dotenv').config();

const http = require('http');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

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
        console.log("Data Source has been initialized!");
    }).catch((err) => {
        console.log("Error :: ", err)
    })

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/ping', function (req, res, next) {
     res.json({message: 'pong'});
});

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

app.get('/posts/:userID', async(req, res) => {
    const { userID } = req.params;

    let postD = await myDataSource.query(
        `SELECT
            posts.id AS postingID,
            posts.title AS postingTitle,
            posts.content AS postingContent
        FROM posts
        WHERE posts.user_id=${userID}`);
        
    let userD = await myDataSource.query(
        `SELECT
            users.id AS userID,
            users.profile_image AS userProfileImage
        FROM users
        WHERE users.id=${userID}`);
    
    userD[0].postings= postD;
    res.status(200).json({data : userD[0]});
});

app.patch('/posts/:postID', async(req, res) => {
    const { postID } = req.params;
    const { content } = req.body;

    await myDataSource.query(
        `UPDATE posts
            SET
                posts.content =?
        WHERE posts.id=${postID}
        `,[content]);

    let updatedPosts = await myDataSource.query(
        `SELECT 
            users.id AS userId,
            users.name AS userName,
            posts.id AS postingId,
            posts.title AS postTitle,
            posts.content AS postingContent
        FROM posts
        INNER JOIN users ON users.id=posts.user_id
        WHERE posts.id=${postID}`);

    res.status(201).json({data : updatedPosts[0]});
}); 

app.delete('/posts/:postID', async(req, res) => {
    const { postID } = req.params;

    await myDataSource.query(
        `DELETE FROM posts
        WHERE posts.id=${postID}`);

    res.status(200).json({ message : "postingDeleted"});
});

app.post('/likes', async(req, res) => {
    const { user_id, post_id } = req.body;

    await myDataSource.query(
        `INSERT INTO likes(
            user_id,
            post_id
        )values(?, ?)
    `,[ user_id, post_id]);

    res.status(201).json({ message : "likeCreated"});
});


const PORT = process.env.PORT;

app.listen(PORT, function () {
     console.log('server listening on port 3000');
});