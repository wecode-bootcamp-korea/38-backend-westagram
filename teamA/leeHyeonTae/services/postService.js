const postDao = require('../models/postDao');


const posts = async ( title, content, url_image, user_id) => {
    try{
    const a = await postDao.createPost(
        title,
        content,
        url_image,
        user_id
    );

    console.log(a)
    return a;
        
    }
    catch(err){
        console.error(err);
    }
};


module.exports = {
    posts
}


