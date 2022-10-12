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

    app.get('/posts/get', async (req, res) => {  
        await appDataSource.query(
          `SELECT
            p.user_id AS userId,
            u.profile_image AS userProfileImage,
            p.id AS postingId,
            p.post_image AS postingImageUrl,
            p.content AS postingContent
            FROM users u, posts p`
          ,(err, rows) => {
            res.status(200).json({ data : rows });
          }
        );
      });

      app.get('/posts/:userId', async (req, res) => {
        const userId = req.params.userId;
        const users = await appDataSource.query(
        `SELECT
          u.id AS userId,
          u.profile_image AS userProfileImage
          FROM users u
          WHERE id=${userId}`
        );
        const posts = await appDataSource.query(
        `SELECT
          p.id AS postingId,
          p.post_image AS postingImageUrl,
          p.content AS postingContent
          FROM posts p
          WHERE user_id=${userId}`
        );
        users[0].postings = posts;
        res.status(200).json({ data : users[0] });
        })

        app.patch('/posts/:userId', async (req, res) => {
            const { userId } = req.params;
            const { content } = req.body;
            await appDataSource.query(
              `UPDATE posts
                SET
                  posts.content=?
                WHERE
                posts.user_id=${userId};
              `,
              [ content ]
            );
            await appDataSource.query(
              `SELECT
                u.id AS userId,
                u.name AS userName,
                p.id AS postingId,
                p.title AS postingTitle,
                p.content AS postingContent
              FROM posts AS p
              INNER JOIN users AS u ON p.user_id =${userId} ` 
              ,(err, rows) => {
                res.status(200).json(rows);
              });
          });
          
      

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