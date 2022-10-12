const westaDataSource = require("../utils/typeorm");

const createUser = async ( name, email, password, profileImage ) => {
    try {
        return await westaDataSource.query(
       `INSERT INTO users (name,email,password,profile_image) VALUES (?,?,?,?);`,
        [ name, email, password, profileImage ]
        );
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

const createSelectUser = async (userId) => {
    try {
        const user = await westaDataSource.query(
        `SELECT 
            users.id as userId, 
            users.profile_image as userProfileImage
        FROM users
        WHERE id=${userId}
        `)

        const posts = await westaDataSource.query(
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
    createUser, createSelectUser
}