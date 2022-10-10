const postDao = require('../models/postDao')

const post = async (user_id,title,content) => {
   
     const createPost = await postDao.createPost(
          user_id,
          title,
          content
        );

        return createPost;
      };

  module.exports = {
      post
  }