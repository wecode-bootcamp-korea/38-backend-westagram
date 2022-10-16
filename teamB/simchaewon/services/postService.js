const postDao=require("../models/postDao");

const upload=async(title, content, userId, postImage)=>{
    
    const createPost = await postDao.createPost(
        title,
        content,
        userId,
        postImage
    );
    return createPost;
};

const readall = async ()=>{
    return await postDao.getPosts();
}

const update = async(postId, contentChange)=>{
    const updatedPost = await postDao.updatePost(
        postId, 
        contentChange
    );
    return await updatedPost;
}

const deletePost=async(postId)=>{
    await postDao.deletingPost(postId);
}

module.exports = {
    upload,
    readall,
    update,
    deletePost
};