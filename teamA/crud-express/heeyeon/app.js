require('dotenv').config();

const http = require('http');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPOPRM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

myDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!')
    });

const app = express()

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

app.get('/ping', function (req, res) {
    res.status(200).json({ message : 'pong '})
});

app.get('/posts/lists', async (req, res, next) => {

    await myDataSource.query(
        `SELECT
            p.user_id As userId,
            u.profile_image As userProfileImage,
            p.id AS postingId,
            p.posting_img_url As postingImageUrl,
            p.content As postingContent
        FROM users u, posts p WHERE p.user_id=u.id;`
    )
    res.status(200).json({ "data" : rows });

});

app.get('/posts/:userId', async (req, res, next) => {
    const userId = req.params.userId;

    const user = await myDataSource.query(
        `SELECT
            id AS userId,
            profile_image AS userProfileImage
        FROM users WHERE id=?;`,
        [userId]
    );

    const post = await myDataSource.query(
        `SELECT
            id AS postingId,
            posting_img_url AS postingImageUrl,
            content AS postingContent
        FROM posts WHERE user_id=?;`,
        [userId]
    );

    user[0]["postings"] = post;
    res.status(201).json({ "data" : user })

});

app.post('/users/signup', async (req, res, next) => {
    const {name, email, profile_image, password} = req.body

    await myDataSource.query(
        `INSERT INTO users(
            name,
            email,
            profile_image,
            password
        ) VALUES (?, ?, ?, ?);
        `,
        [name, email, profile_image, password]
    );

    res.status(201).json({ message : "userCreated" })

});

app.post('/posts/post', async (req, res, next) => {
    const {id, title, content, user_id} = req.body

    await myDataSource.query(
        `INSERT INTO posts(
            id,
            title,
            content,
            user_id
        ) VALUES (?, ?, ?, ?);
        `,
        [id, title, content, user_id]
    );

    res.status(201).json({ message : "postCreated" })

});

app.post('/likes', async (req, res, next) => {
    const {user_id, post_id} = req.body

    await myDataSource.query(

        `INSERT INTO likes(
            user_id,
            post_id
        ) VALUES (?,?);`,
        [user_id, post_id]
    );
    
    res.status(201).json({ message : "likeCreated" });

})

app.patch('/posts', async (req, res, next) => {
    const {userId, postId, postContent} = req.body;

    await myDataSource.query(`
        UPDATE posts
        SET content=?
        WHERE user_id=? AND id=?;`,
        [postContent, userId, postId]
    );

    const data = await myDataSource.query(`
        SELECT
            u.id AS userId,
            u.name AS userName,
            p.id AS postingId,
            p.title AS postingTitle,
            p.content AS postingContent
        FROM users u, posts p WHERE u.id=? AND p.id=?;`,
        [userId, postId]
    );

    res.status(201).json({ "data" : data })

});

app.delete('/posts/:postId', async (req, res, next) => {
    const postId = req.params.postId;

    await myDataSource.query(
        `DELETE FROM posts WHERE id=${postId};`
    );
    
    res.status(204).json({ "message" : "postingDeleted" })

});

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
    } catch (err) {
        console.log(err);
    }
};

start()
