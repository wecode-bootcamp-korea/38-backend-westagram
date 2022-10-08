const postDao = require('../models/postDao');


const posts = async ( title, content, posting_image, user_id) => {
    
    const createPost = await postDao.createPost(
        title,
        content,
        posting_image,
        user_id
    );

    return createPost;

};

module.exports = {
    posts
}


