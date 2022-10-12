const postService = require("../services/postService");

const upload = async (req, res) => {
  try {
    const { title, content, userName, postImage } = req.body;

    if (!title || !content || !userName || !postImage) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await postService.upload(title, content, userName, postImage);
    return res.status(201).json({
      message: "POSTUPLOAD_SUCCESS",
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const readall = async (req, res) => {
  try {
    const posts = await postService.readall();
    return res.status(200).json({
      data: posts,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { postId, contentChange } = req.body;
    if (!postId || !contentChange) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const changedData = await postService.update(postId, contentChange);
    return await res.status(200).json({ data: changedData });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.body;
    if (!postId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    await postService.deletePost(postId);
    return await res.status(200).json({ message: "postDeleted" });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  upload,
  readall,
  update,
  deletePost,
};
