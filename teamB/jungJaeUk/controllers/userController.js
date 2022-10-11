const userService = require("../services/userService");

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

const signUp = async (req, res) => {
  try {
    const { name, email, profile_image, password } = req.body;

    if ( !name || !email || !profile_image || !password ) {
      return res.status(400).json({ "message" : "KEY_ERROR" });
    }

    await userService.signUp( name, email, profile_image, password );

    res.status(201).json({ "data" : "userCreated" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ "message" : err.message });
  }
};

module.exports = { 
  posts, 
  signUp 
};