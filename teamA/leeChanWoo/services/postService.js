const { postDao } = require('../models');

 const posting = async ( title, content, user_id ) => {
     const createPost = await postDao.createPost(
          title,
          content,
          user_id
     );
     return createPost;
 }

 const viewPost = async () => {
     return await postDao.viewPost();
} 

const viewUserPost = async (userID) => {
     return await postDao.viewUserPost(userID);
}

const updatePost = async (postID, content) => {
     return await postDao.updatePost(postID, content);
}

const deleting = async (postID) => {
     return await postDao.deleting(postID);
}



module.exports = { posting, viewPost, viewUserPost, updatePost, deleting };