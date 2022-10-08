const postDao = require('../models/postDao');


const posts = async ( title, content, url_image, user_id) => {
    
    const createPost = await postDao.createPost(
        title,
        content,
        url_image,
        user_id
    );

    return createPost;

};

const search = async () => {
    const searchPost = await postDao.searchPost();

    return searchPost;
}

module.exports = {
    posts,search
}


