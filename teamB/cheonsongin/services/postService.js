const postDao = require('../models/postDao');

const registration = async (title, post_image, content, user_id) => {
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

const modification = async (content, id, user_id) => {
  const updatePost = await postDao.updatePost(
    content,
    id,
    user_id
  );

  return updatePost;
}

const deletion = async (postId) => {
  const deletePost = await postDao.deletePost(
    postId
  );

  return deletePost;
}

module.exports = {
  registration,
  viewAllPosts,
  modification,
  deletion
}