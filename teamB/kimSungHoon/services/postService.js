const postDao = require('../models/postDao');

const createPost = async (title, content, user_id) => {
    const createPost = await postDao.createPost(
        title,
        content,
        user_id
    );
    return createPost;
 };

 const readingPost = async () => {
    const result = await postDao.readingPost();
    return result;
 };



module.exports = {
    createPost,
    readingPost
}