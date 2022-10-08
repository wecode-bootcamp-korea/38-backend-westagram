const postDao = require("../model/postDao");

const posting = async (title, content, userId) => {
  const createPost = await postDao.createPost(title, content, userId);
  return createPost;
};

const allPosts = async () => {
  const data = await postDao.allPosts();
  return data;
};

module.exports = { posting, allPosts };
