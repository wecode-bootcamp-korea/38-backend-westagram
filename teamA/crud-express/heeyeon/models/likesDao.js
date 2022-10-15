const dataSource = require('./dataSource');

const pressLikes = async(post_id, user_id) => {
    try {
        return await dataSource.AppDataSource.query(`
        INSERT INTO likes(
            post_id,
            user_id
        ) VALUES (?, ?);`,
        [post_id, user_id]
        );
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }

};

module.exports = {
    pressLikes
}