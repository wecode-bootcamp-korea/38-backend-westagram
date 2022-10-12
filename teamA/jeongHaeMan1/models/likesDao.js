const myDataSource = require("../utils/typeorm");


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