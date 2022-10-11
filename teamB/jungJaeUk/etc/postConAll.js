const userService = require("../services/postSvcAll");

const postsAll = async (req, res) => {
  try {
    const result = await userService.postsAll();

    res.status(200).json({ "data" : result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ "message" : err.message });
  };
};

module.exports = { postsAll };