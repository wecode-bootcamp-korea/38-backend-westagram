const likeDao = require('../models/likeDao');

const likePost = async (user_id, post_id) => {

  const postLike = await likeDao.postLike(
    user_id,
    post_id
  );

  return postLike;
};

module.exports = {
  likePost
}