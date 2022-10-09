const userDao = require("../models/postDaoDelete");

const postsDelete = async ( post_id ) => {
  const deletePost = await userDao.deletePost(
    post_id
  );

  return deletePost;
};

module.exports = { postsDelete };