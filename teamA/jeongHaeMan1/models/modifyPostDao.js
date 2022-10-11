//models/userDao.js
const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    database: process.env.TYPEORM_DATABASE
})

myDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
        myDataSource.destroy()
    })

const modifyPost = async (content, postId) => {
    try {
        await myDataSource.query(
        `UPDATE posts SET
            content = ?
            WHERE id = ?`,
        [content, postId]
        )

        return await myDataSource.query(
            `SELECT 
                users.id as userId, 
                users.name as userName, 
                posts.id as postingId,
                posts.title as postingTitle,
                posts.content as postingContent    
            FROM (users, posts) 
            WHERE users.id=posts.user_id AND posts.id= ${[postId]}`

        )

    } catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500;
        throw error;
    }
};

module.exports = {
    modifyPost
}