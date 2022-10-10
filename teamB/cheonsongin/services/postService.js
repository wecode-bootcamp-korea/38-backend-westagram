const postDao = require('../models/postDao');

const upload = async (title, post_image, content, user_id) => {
  const createPost = await postDao.createPost(
    title,
    post_image,
    content,
    user_id
  );

  return createPost;
};

const viewAllPosts = async () => {
  const selectPost = await postDao.selectPost();
  return selectPost;
};

module.exports = {
  upload,
  viewAllPosts
}