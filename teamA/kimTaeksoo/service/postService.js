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
  const data = await postDao.allPosts();
  return data;
};

module.exports = { posting, allPosts };
