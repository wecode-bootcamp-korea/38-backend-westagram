const userDao = require("../models/postDaoLike");

const postsLike = async ( user_id, post_id ) => {
  const likePost = await userDao.likePost(
    user_id,
    post_id
  );

  return likePost;
};

module.exports = { postsLike };