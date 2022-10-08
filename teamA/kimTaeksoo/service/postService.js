const postDao = require("../model/postDao");

const posting = async (title, content, userId) => {
  const createPost = await postDao.createPost(title, content, userId);
  return createPost;
};

module.exports = { posting };
