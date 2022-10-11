const userDao = require("../models/postDaoUpdate");

const postsUpdate = async ( user_id, post_id, content ) => {
  const updatePost = await userDao.updatePost(
    user_id,
    post_id,
    content
  );

  return updatePost;
};

module.exports = { postsUpdate };