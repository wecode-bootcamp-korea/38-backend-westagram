const postDao = require('../models/postDao');

const postUp = async (title, content, user_id, posting_image) => {
  const createPost = await postDao.createPost(
    title,
    content,
    user_id,
    posting_image
  );

  return createPost;
};

const postsList = async () => {
  return await postDao.getPostsList();
};

const postsListByUser = async (userId) => {
  return await postDao.getPostsListByUser(userId);
};

const postDown = async (postId) => {
  return await postDao.deletePost(postId);
};

module.exports = {
  postUp,
  postsList,
  postsListByUser,
  postDown
}