//service/userService.js

const postDao = require('../models/postDao')

const write = async (title, content, user_id, image_url) => {
    const createPost = await postDao.createPost(
        title, 
        content, 
        user_id, 
        image_url
    );

    return createPost;
};

module.exports = {
    write
}