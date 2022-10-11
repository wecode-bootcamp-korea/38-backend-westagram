const postDao = require('../models/postDao');

const createPost = async (title, content, user_id) => {
    const createPost = await postDao.createPost(
        title,
        content,
        user_id
    );
    return createPost;
 };


module.exports = {
    createPost
}