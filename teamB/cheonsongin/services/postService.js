const postDao = require('../models/postDao');
const { post } = require('../routes');

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

const viewUserId = async (userId) => {
  const selectUserPost = await postDao.selectUserPost(userId);
  return selectUserPost;
}

const postUpdate = async (content, id, user_id) => {
  const updatePost = await postDao.updatePost(
    content,
    id,
    user_id
  );

  return updatePost;
}

const postDelete = async (postId) => {
  const deletePost = await postDao.deletePost(
    postId
  );

  return deletePost;
}

module.exports = {
  upload,
  viewAllPosts,
  viewUserId,
  postUpdate,
  postDelete
}