const likeService = require('../services/likeService');

const likeUp = async (req, res) => {
  try {
    const { userId, postId } = req.body

  await likeService.likeUp(userId, postId);

  return res.status(201).json({ message : 'LIKE_CREATED' });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  likeUp
}
