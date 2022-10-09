const userService = require("../services/postSvcDelete");

const postsDelete = async (req, res) => {
  try {
    const { post_id } = req.body;

    if ( !post_id ) {
      return res.status(400).json({ "message" : "KEY_ERROR" });
    }

    await userService.postsDelete( post_id );

    res.status(200).json({ "data" : "postDeleted" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ "message" : err.message });
  }
};

module.exports = { postsDelete };