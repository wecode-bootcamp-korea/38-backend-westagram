const likeDao = require('../models/likeDao');

const like = async (user_id,post_id) => {
    try{
    const createLike = await likeDao.createLike( user_id,post_id );
    return createLike;
    }
    catch (err){
        console.log(err);
        const error = new Error('invalid data input');
        error.statusCode = 500;
        throw error;
    }
}

module.exports = { like };