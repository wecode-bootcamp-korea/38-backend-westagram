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

const postUpdate = async (content, title, user_id) => {
  const updatePost = await postDao.updatePost(
    content,
    title,
    user_id
  );

  return updatePost;
}

module.exports = {
  upload,
  viewAllPosts,
  viewUserId,
  postUpdate
}