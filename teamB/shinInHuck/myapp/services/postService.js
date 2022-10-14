const postDao = require('../models/postDao');
const upload = async (title, content, user_id) => {
  const createPost = await postDao.createPost(
    title,
    content,
    user_id
  );
  return createPost;
};

const viewAllPosts = async () => {
  const selectPost = await postDao.selectPost();
  return selectPost;
};

const viewUserId = async (userId) => {
  const selectUserPost = await postDao.selectUserPost(userId);
  return selectUserPost;
}

module.exports = {
  upload,
  viewAllPosts,
  viewUserId
}