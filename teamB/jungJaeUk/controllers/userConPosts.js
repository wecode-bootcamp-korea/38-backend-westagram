const userService = require("../sevices/userSvcPorsts");

const posts = async (req, res) => {
  try {
    const { userId } = req.id;

    if ( !userId ) {
      return res.status(400).json({ "message" : "KEY_ERROR" });
    }

    await userService.posts( userId );

    res.status(200).json({ "data" : result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ "message" : err });
  };
};

module.exports = { posts };