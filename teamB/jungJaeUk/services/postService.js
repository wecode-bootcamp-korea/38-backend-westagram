const postDao = require("../models/postDao");

const postsAdd = async ( title, content, user_id ) => {
  const createPost = await postDao.createPost(
    title,
    content,
    user_id
  );

  return createPost;
};

const postsAll = async () => {
  const postsAll = await postDao.postsAll();

  return postsAll;
};

const postsDelete = async ( post_id ) => {
  const deletePost = await postDao.deletePost(
    post_id
  );

  return deletePost;
};

const postsLike = async ( user_id, post_id ) => {
  const likePost = await postDao.likePost(
    user_id,
    post_id
  );

  return likePost;
};

const postsUpdate = async ( user_id, post_id, content ) => {
  const updatePost = await postDao.updatePost(
    user_id,
    post_id,
    content
  );

  return updatePost;
};

module.exports = { 
  postsUpdate,
  postsLike,
  postsDelete,
  postsAll,
  postsAdd
};