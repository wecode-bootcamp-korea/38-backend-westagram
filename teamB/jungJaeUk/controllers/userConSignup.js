const userService = require("../sevices/userSvcSignup");

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

module.exports = { signUp };