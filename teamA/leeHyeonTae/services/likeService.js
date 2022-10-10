const likeDao = require('../models/likeDao');

const like = async (user_id,post_id) => {

    const createLike = await likeDao.createLike( user_id,post_id );
    return createLike;
}

module.exports = { like };