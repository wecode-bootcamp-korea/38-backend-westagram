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

const createSelectUser = async (userId) => {
    try {
        const user = await myDataSource.query(
        `SELECT 
            users.id as userId, 
            users.profile_image as userProfileImage
        FROM users
        WHERE id=${userId}
        `)

        const posts = await myDataSource.query(
        `SELECT
            posts.id as postingId,
            posts.image_url as postingImageUrl,
            posts.content as postingContent
        FROM posts
        WHERE user_id=${userId}
        `);

        user[0]['postings'] = posts;
        
        return user;

    } catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500;
        throw error;
    }
};

module.exports = {
    createSelectUser
}
