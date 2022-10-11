const userService = require("../services/postSvcAdd");

const postsAdd = async (req, res) => {
  try {
    const { title, content, user_id } = req.body;

    if ( !title || !content || !user_id ) {
      return res.status(400).json({ "message" : "KEY_ERROR" });
    }

    await userService.postsAdd( title, content, user_id );

    res.status(201).json({ "data" : "postCreated" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ "message" : err.message });
  }
};

module.exports = { postsAdd };