const { DataSource } = require('typeorm');

const appDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

appDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
        appDataSource.destroy()
    })

const createUser = async ( name, email, profile_image, password ) => {
    try {
        return await appDataSource.query(
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

const userPosting = async (id) => {
    try {
        const users = await appDataSource.query(
        `SELECT 
            users.id AS userId,
            users.profile_image AS userProfileImage
        FROM users
        WHERE id=${id}`
        );

        const posts = await appDataSource.query(
        `SELECT
            posts.id AS postingId,
            posts.title AS postingTitle,
            posts.content AS postingContent
        FROM posts
        WHERE user_id=${id}`   
        );  

        users[0]['postings'] = posts;
        return users;

    } catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
}

const like = async (user_id, post_id) => {
    try {
        await appDataSource.query(
        `INSERT INTO likes(
            user_id,
            post_id
        ) VALUES (?, ?);
        `, [ user_id, post_id ]    
        );
    } catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
}

module.exports = {
    createUser,
    userPosting,
    like
  }