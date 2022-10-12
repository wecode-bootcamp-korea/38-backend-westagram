const westaDataSource = require("../utils/typeorm");

const createPost = async (title, content, user_id, image_url) => {
    try {
        return await westaDataSource.query(
        `INSERT INTO posts(
            title, 
            content, 
            user_id, 
            image_url
        ) VALUES (?, ?, ?, ?);
        `,
        [ title, content, user_id, image_url ]
        );
    } catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500;
        throw error;
    }
};

const createGetPost = async () => {
    try {
        return await westaDataSource.query(
        `SELECT 
            users.id as userId, 
            users.profile_image as userProfileImage, 
            posts.id as postingId,
            posts.image_url as postingImageUrl,
            posts.content as postingContent
        FROM (users, posts)
        WHERE users.id = posts.user_id;
        `)
    } catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500;
        throw error;
    }
};

const modifyPost = async (content, postId) => {
    try {
        await westaDataSource.query(
        `UPDATE posts SET
            content = ?
            WHERE id = ?`,
        [content, postId]
        )

        return await westaDataSource.query(
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

const deletePost = async (deleteId) => {
    try {
        return await westaDataSource.query(
        `DELETE 
            FROM posts
        WHERE id = ${deleteId};
        `)
    } catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500;
        throw error;
    }
};

module.exports = {
    createPost, createGetPost, modifyPost, deletePost
}