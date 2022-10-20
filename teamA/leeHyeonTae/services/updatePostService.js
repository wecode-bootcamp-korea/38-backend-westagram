const updatePostDao = require('../models/updatePostDao');

const update = async (userId, postId, title, content) => {
    try{
    const updatePost = await updatePostDao.updatePost(userId, postId, title, content);
    
    return updatePost;
}
catch (err){
    console.log(err);
    const error = new Error('invalid data input');
    error.statusCode = 500;
    throw error;
}
}


module.exports = {update};