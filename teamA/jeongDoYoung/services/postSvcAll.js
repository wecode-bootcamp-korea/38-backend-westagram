const postDaoAll = require("../models/postDaoAll");

const postsAll = async () => {
  const postsAll = await postDaoAll.postsAll();

  return postsAll;
};

module.exports = { postsAll };