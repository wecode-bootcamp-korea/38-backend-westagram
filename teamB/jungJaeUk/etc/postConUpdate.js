const userService = require("../services/postSvcUpdate");

const postsUpdate = async (req, res) => {
  try {
    const { user_id, post_id, content } = req.body;

    if ( !user_id || !post_id || !content ) {
      return res.status(400).json({ "message" : "KEY_ERROR" });
    }

    const result = await userService.postsUpdate( user_id, post_id, content );

    res.status(200).json({ "data" : result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ "message" : err.message });
  }
};

module.exports = { postsUpdate };