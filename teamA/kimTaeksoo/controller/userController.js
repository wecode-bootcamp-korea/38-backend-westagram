const userService = require("../service/userService");

const signUp = async (req, res) => {
  try {
    const { name, email, profileImage, password } = req.body;

    if (!name || !email || !profileImage || !password) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await userService.signUp(name, email, profileImage, password);

    return res.status(201).json({ message: "UserCreated" });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const signIn = async (req, res) => {
  try {
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const userIdMatchPosts = async (req, res) => {
  const reqUserId = req.params;

  if (!reqUserId) {
    return res.status(400).json({ message: "KEY_ERROR" });
  }

  const data = await userService.userIdMatchPosts(reqUserId);
  return res.status(200).json({ data });
};

module.exports = { signUp, userIdMatchPosts };
