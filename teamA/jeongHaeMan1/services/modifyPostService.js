const modifyPostDao = require('../models/modifyPostDao')

const modify = async (content, postId) => {
    const modifyPost = await modifyPostDao.modifyPost(content, postId);

    return modifyPost;
};

module.exports = {
    modify
}