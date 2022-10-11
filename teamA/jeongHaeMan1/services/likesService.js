const likesDao = require('../models/likesDao');

const likes = async(user_id, post_id) => {
    try {
        await likesDao.likes(user_id,post_id);
    }
    catch(err) {
        console.error(err);
    }
}

module.exports = {
    likes
}

