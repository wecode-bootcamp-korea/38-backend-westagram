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

const search = async () => {
    const createGetPost = await postDao.createGetPost();

    return createGetPost;
};

const modify = async (content, postId) => {
    const modifyPost = await postDao.modifyPost(content, postId);

    return modifyPost;
};

const deletePost = async(deleteId) => {
    try {
        await postDao.deletePost(deleteId);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    write, search, modify, deletePost
}