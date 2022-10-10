const postDao=require("../models/postDao");

const upload=async(title, content, userName, postImage)=>{
    
    const createPost = await postDao.createPost(
        title,
        content,
        userName,
        postImage
    );


    return createPost;
};

const readall = async ()=>{
    return await postDao.getPosts();
}


module.exports = {
    upload,
    readall
};