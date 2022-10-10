const likeDao = require('../models/likeDao')

const likeUp = async (userId, postId) => {
  const createLike = await likeDao.createLike(
    userId,
    postId
  );
  
  return createLike;
};

module.exports = {
  likeUp
}