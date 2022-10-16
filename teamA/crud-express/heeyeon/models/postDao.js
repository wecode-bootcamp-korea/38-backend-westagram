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
        return user;

    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

const updatePost = async(title, content, posting_img_url, user_id, post_id)=>{
    try {
        await dataSource.AppDataSource.query(`
            UPDATE posts
            SET title=?, content=?, posting_img_url=?
            WHERE user_id=? AND id=?;`,
            [title, content, posting_img_url, user_id, post_id]
        );

        const data = await dataSource.AppDataSource.query(`
            SELECT
                p.user_id AS userId,
                u.name AS userName,
                p.id AS postingId,
                p.title AS postingTitle,
                p.content AS postingContent
            FROM users u, posts p WHERE u.id=? AND p.id=?;`,
            [user_id, post_id]
        );

        return data;

    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

const deletePost = async(post_id) => {
    try {
        return await dataSource.AppDataSource.query(`
        DELETE FROM posts
        WHERE id=?;`,
        [post_id]
        );

    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getOnesPosts,
    updatePost,
    deletePost
}