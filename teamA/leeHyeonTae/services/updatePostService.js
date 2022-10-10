const updatePostDao = require('../models/updatePostDao');

const update = async (userId, postId, title, content) => {
    const updatePost = await updatePostDao.updatePost(userId, postId, title, content);
    
    return updatePost;
}

module.exports = {update};