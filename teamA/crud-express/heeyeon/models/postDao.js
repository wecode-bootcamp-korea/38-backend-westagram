const dataSource = require('./dataSource');

const createPost = async (title, content, user_id, posting_img_url) => {
    try {
        return await dataSource.AppDataSource.query(
            `INSERT INTO posts(
                title,
                content,
                user_id,
                posting_img_url
            ) VALUES (?, ?, ?, ?);`,
            [title, content, user_id, posting_img_url]
        );
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

const getAllPosts = async () => {
    try {
        return await dataSource.AppDataSource.query(
            `SELECT
                p.user_id As userId,
                u.profile_image As userProfileImage,
                p.id AS postingId,
                p.posting_img_url As postingImageUrl,
                p.content As postingContent
            FROM users u, posts p WHERE p.user_id=u.id;`
        );
    } catch (err) {
        const error = new Error('CANNOT_GET_ALL_POSTS');
        error.statusCode = 500;
        throw error;
    }
};

const getOnesPosts = async(user_id) => {
    try {
        const user = await dataSource.AppDataSource.query(
        `SELECT
            id AS userId,
            profile_image AS userProfileImage
        FROM users WHERE id=?;`,
        [user_id]
        );

        const post = await dataSource.AppDataSource.query(
        `SELECT
            id AS postingId,
            posting_img_url AS postingImageUrl,
            content AS postingContent
        FROM posts WHERE user_id=?;`,
        [user_id]
        );
    
        user[0]["postings"] = post;

    } catch (err) {
        const error = new Error('CANNOT_GET_ONES_POSTS');
        error.statusCode = 500;
        throw error;
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getOnesPosts
}