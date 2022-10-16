const postDao = require("../model/postDao");

const posting = async (title, content, userId, postingImageUrl) => {
  try {
    const createPost = await postDao.createPost(
      title,
      content,
      userId,
      postingImageUrl
    );
    return createPost;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const allPosts = async () => {
  try {
    return await postDao.allPosts();
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const ServicePatchPosting = async (userId, postingId, content) => {
  try {
    const data = await postDao.daoPatchPosting(userId, postingId, content);
    return data;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const deletePosting = (postingId) => {
  try {
    return postDao.deletePosting(postingId);
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const likePosting = (userId, postingId) => {
  try {
    return postDao.likePosting(userId, postingId);
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  posting,
  allPosts,
  ServicePatchPosting,
  deletePosting,
  likePosting,
};
