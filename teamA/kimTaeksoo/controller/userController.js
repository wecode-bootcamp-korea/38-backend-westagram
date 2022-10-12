const userService = require("../service/userService");

const signUp = async (req, res) => {
  const { name, email, profileImage, password } = req.body;

  try {
    if (!name || !email || !profileImage || !password) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await userService.signUp(name, email, profileImage, password);

    return res.status(201).json({ message: "UserCreated" });
  } catch (err) {
    res.json({ "Error Code": err.statusCode, "Error message": err.message });
  }
};

const userIdMatchPosts = async (req, res) => {
  try {
    const reqUserId = req.params;

    if (!reqUserId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    const data = await userService.userIdMatchPosts(reqUserId);
    return res.status(200).json({ data });
  } catch (err) {
    res.json({ "Error Code": err.statusCode, "Error message": err.message });
  }
};

module.exports = { signUp, userIdMatchPosts };
