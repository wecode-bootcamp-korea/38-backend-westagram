const moduleDao = require('./moduleDao');

const createUser = async ( name, email, profile_image, password ) => {
    try {
        return await moduleDao.appDataSource.query(
            `INSERT INTO users(
                name,
                email,
                profile_image,
                password
            ) VALUES (?, ?, ?, ?);
            `,
            [name, email, profile_image, password]
        );
    } catch(err) {
        const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
    }
};

const userPosting = async (userId) => {
    try {
        const users = await moduleDao.appDataSource.query(
        `SELECT 
            users.id AS userId,
            users.profile_image AS userProfileImage
        FROM users
        WHERE id=${userId}`
        );

        const posts = await moduleDao.appDataSource.query(
        `SELECT
            posts.id AS postingId,
            posts.title AS postingTitle,
            posts.content AS postingContent
        FROM posts
        WHERE user_id=${userId}`   
        );  
        
        users[0]['postings'] = posts;
        return users;

    } catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
}

module.exports = {
    createUser,
    userPosting
  }