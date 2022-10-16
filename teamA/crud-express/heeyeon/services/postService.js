const postDao = require('../models/postDao');

const post = async(title, content, user_id, posting_img_url) => {
    return await postDao.createPost(title, content, user_id, posting_img_url);
};

const allPosts = async() => {
    return await postDao.getAllPosts();
};

const onesPosts = async(user_id) => {
    return await postDao.getOnesPosts(user_id);
};

const updatePost = async(title, content, posting_img_url, user_id, post_id) => {
    return await postDao.updatePost(title, content, posting_img_url, user_id, post_id);
};

const deletePost = async(post_id) => {
    return await postDao.deletePost(post_id);
};

module.exports = {
    post,
    allPosts,
    onesPosts,
    updatePost,
    deletePost
}