const likesDao = require('../models/likesDao');

const pressLikes = async(post_id, user_id) => {
    return await likesDao.pressLikes(post_id, user_id);
};

module.exports = {
    pressLikes
}