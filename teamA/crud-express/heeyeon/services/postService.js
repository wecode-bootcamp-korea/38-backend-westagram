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

module.exports = {
    post,
    allPosts,
    onesPosts
}