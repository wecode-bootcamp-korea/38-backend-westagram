const likeDao = require('../models/likeDao');

const likePost = async (userId, postId) => {

  const postLike = await likeDao.postLike(
    userId,
    postId
  );

  return postLike;
};

module.exports = {
  likePost
}