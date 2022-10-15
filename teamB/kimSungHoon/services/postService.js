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

const updatePost = async (content, postId) => {
    const result = await postDao.updatePost(
        content,
        postId
    );
    return result;
}

const deletePost = async (postId) => {
    const result = await postDao.deletePost(postId);
    return result;
}


module.exports = {
    createPost,
    readingPost,
    updatePost,
    deletePost
}