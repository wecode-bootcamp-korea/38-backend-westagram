const userDao = require("../models/postDaoAdd");

const postsAdd = async ( title, content, user_id ) => {
  const createPost = await userDao.createPost(
    title,
    content,
    user_id
  );

  return createPost;
};

module.exports = { postsAdd };