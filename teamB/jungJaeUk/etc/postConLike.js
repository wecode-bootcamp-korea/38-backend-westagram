const userService = require("../services/postSvcLike");

const postsLike = async (req, res) => {
  try {
    const { user_id, post_id } = req.body;

    if ( !user_id || !post_id ) {
      return res.status(400).json({ "message" : "KEY_ERROR" });
    }

    await userService.postsLike( user_id, post_id );

    res.status(201).json({ "data" : "likeCreate" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ "message" : err.message });
  }
};

module.exports = { postsLike };