const userService = require('../services/userService');

const signUp = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body;

    if ( !name || !email || !password || !profileImage ) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await userService.signUp( name, email, password, profileImage );
    return res.status(201).json({
      message: 'SIGNUP_SUCCESS',
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message});
  }
};

const viewUserId = async (req, res) => {
  try {
    const userId = req.params.userid;

    const data = await userService.viewUserId(userId);

    if ( !userId ) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message});
  }
};

module.exports = {
  signUp,
  viewUserId
}