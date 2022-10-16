const likeDao = require('../models/likeDao');

const like = async (user_id, post_id) => {
    const result = await likeDao.like(
        user_id, 
        post_id
    );
    return result;
}

module.exports = {
    like
}