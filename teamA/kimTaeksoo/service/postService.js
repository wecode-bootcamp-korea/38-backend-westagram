const postDao = require("../model/postDao");

const posting = async (title, content, userId, postingImageUrl) => {
  const createPost = await postDao.createPost(
    title,
    content,
    userId,
    postingImageUrl
  );
  return createPost;
};

const allPosts = async () => {
  return await postDao.allPosts();
};

const ServicePatchPosting = async (userId, postingId, content) => {
  const data = await postDao.daoPatchPosting(userId, postingId, content);
  return data;
};

const deletePosting = async (postingId) => {
  return await postDao.deletePosting(postingId);
};

const likePosting = async (userId, postingId) => {
  return await postDao.likePosting(userId, postingId);
};

module.exports = {
  posting,
  allPosts,
  ServicePatchPosting,
  deletePosting,
  likePosting,
};
