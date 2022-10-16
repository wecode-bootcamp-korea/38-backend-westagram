const postService = require("../service/postService");
const asyncwrap = require("../middleware/errorMiddleware");

const posting = async (req, res) => {
  try {
    const { title, content, userId, postingImageUrl } = req.body;

    if (!title || !content || !userId || !postingImageUrl) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await postService.posting(title, content, userId, postingImageUrl);
    return res.status(201).json({ message: "postCreated" });
  } catch (err) {
    res.json({ "Error Code": err.statusCode, "Error message": err.message });
  }
};

const allPosts = async (req, res) => {
  try {
    const data = await postService.allPosts();
    return res.status(200).json({
      data,
    });
  } catch (err) {
    res.json({ "Error Code": err.statusCode, "Error message": err.message });
  }
};

const patchPosting = async (req, res) => {
  try {
    const { userId, postingId } = req.params;
    const { content } = req.body;
    const data = await postService.ServicePatchPosting(
      userId,
      postingId,
      content
    );
    return res.status(200).json({ data });
  } catch (err) {
    res.json({ "Error Code": err.statusCode, "Error message": err.message });
  }
};

const deletePosting = async (req, res) => {
  try {
    const { postingId } = req.params;
    await postService.deletePosting(postingId);
    return res.status(200).json({ message: "postingDeleted" });
  } catch (err) {
    res.json({ "Error Code": err.statusCode, "Error message": err.message });
  }
};

const likePosting = async (req, res) => {
  try {
    const { userId, postingId } = req.params;

    await postService.likePosting(userId, postingId);

    res.status(200).json({ message: "likeCreated" });
  } catch (err) {
    res.json({ "Error Code": err.statusCode, "Error message": err.message });
  }
};

module.exports = {
  posting,
  allPosts,
  patchPosting,
  deletePosting,
  likePosting,
};
