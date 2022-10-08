const postService = require("../service/postService");

const posting = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await postService.posting(title, content, userId);
    return res.status(201).json({ message: "postCreated" });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const allPosts = async (req, res) => {
  try {
    const data = await postService.allPosts();
    return res.status(200).json({
      data,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = { posting, allPosts };
