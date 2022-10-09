const userService = require("../services/userSvcPosts");

const posts = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if ( !userId ) {
      return res.status(400).json({ "message" : "KEY_ERROR" });
    }

    const result = await userService.posts( userId );

    res.status(200).json({ "data" : result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ "message" : err.message });
  };
};

module.exports = { posts };