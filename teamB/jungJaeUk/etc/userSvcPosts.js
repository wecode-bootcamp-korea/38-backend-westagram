const userDao = require("../models/userDaoPosts");

const posts = async ( userId ) => {
  const postsList = await userDao.postsList(userId);

  return postsList;
};

module.exports = { posts };