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

const likes = async (user_id, post_id) => {
    try {
        return await myDataSource.query(
        `INSERT INTO likes (user_id, post_id) VALUES (?, ?) `,
        [user_id, post_id] 
        )

    } catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500;
        throw error;
    }
};

module.exports = {
    likes
}