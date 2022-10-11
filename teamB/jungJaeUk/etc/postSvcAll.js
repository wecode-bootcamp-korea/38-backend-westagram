const userDao = require("../models/postDaoAll");

const postsAll = async () => {
  const postsAll = await userDao.postsAll();

  return postsAll;
};

module.exports = { postsAll };