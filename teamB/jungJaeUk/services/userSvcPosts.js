const userDao = require("../models/userDaoPosts");

const posts = async ( userId ) => {
  const postsListAll = await userDao.postsListAll(userId);

  return postsListAll;
};

module.exports = { posts };