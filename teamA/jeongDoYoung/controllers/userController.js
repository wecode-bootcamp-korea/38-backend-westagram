const userService = require('../services/userService');

const signUp = async (req, res) => {
  try {
    const { name, email, password, profile_image } = req.body;

    if ( !name || !email || !password || !profile_image ) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await userService.signUp( name, email, password, profile_image );
    return res.status(201).json({
      message: 'SIGNUP_SUCCESS',
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
	signUp
}