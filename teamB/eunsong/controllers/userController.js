const userService = require('../services/userService');

const signUp = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body;

    if ( !name || !email || !password || !profileImage ) {
      return res.status(400).json({ message : 'KEY_ERROR' });
    }

    await userService.signUp(name, email, password, profileImage);

    return res.status(201).json({ message : 'SIGNUP_SUCCESS' });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message : err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const userId = req.params.userId;
    const postId = req.params.postId;
  
    const { title, content } = req.body;

    if ( !title || !content ) {
      return res.status(400).json({ message : 'KEY_ERROR' });
    }

    const data = await userService.updatePost(userId, postId, title, content);

    return res.status(201).json(data);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message : err.message });
  }
};

module.exports = {
  signUp,
  updatePost
}