const moduleDao = require('./moduleDao');

const createPost = async (title, content, user_id) => {
    try {
        return await moduleDao.appDataSource.query(
            `INSERT INTO posts(
                title,
                content,
                user_id
            ) VALUES (?, ?, ?);
            `,
            [ title, content, user_id ]
        ); 
    } catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
}

const readingPost = async (req, res) => {
    try {
        return await moduleDao.appDataSource.query(
        `SELECT 
            users.id AS userId,
            users.profile_image AS userProfileImage,
            posts.id AS postingId,
            posts.title AS postingTitle,
            posts.content AS postingContent
        FROM users
        INNER JOIN posts ON posts.user_id = users.id
        `    
        ); 
    } catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
}

const updatePost = async (content, postId) => {
    try {
        await moduleDao.appDataSource.query(
        `UPDATE posts
            SET
                content = ? 
            WHERE id = ?
      `, [content, postId]
      );
        return await moduleDao.appDataSource.query(
        `SELECT
            users.id AS userId,
            users.profile_image AS userProfileImage,
            posts.id AS postingId,
            posts.title AS postingTitle,
            posts.content AS postingContent
        FROM posts,users
        WHERE users.id = posts.user_id AND posts.id = ${postId}
        `    
        )
    } catch(err){
        const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
    }
}

const deletePost = async (postId) => {
    try {
        return await moduleDao.appDataSource.query(
        `DELETE FROM posts
        WHERE posts.id = ${postId}
        `
        );

    } catch(err){
        const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
    }
}

module.exports = {
    createPost,
    readingPost,
    updatePost,
    deletePost
}