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

const createPost = async (title, content, user_id, image_url) => {
    try {
        return await myDataSource.query(
        `INSERT INTO users(
            title, 
            content, 
            user_id, 
            image_url
        ) VALUES (?, ?, ?, ?);
        `,
        [ title, content, user_id, image_url ]
        );
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

module.exports = {
    createPost
}