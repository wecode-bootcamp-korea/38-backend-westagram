const postService = require("../service/postService");

const posting = async (req, res) => {
  try {
    const { title, content, userId, postingImageUrl } = req.body;

    if (!title || !content || !userId || !postingImageUrl) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await postService.posting(title, content, userId, postingImageUrl);
    return res.status(201).json({ message: "postCreated" });
  } catch (error) {
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
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const deletePosting = async (req, res) => {
  try {
    const { postingId } = req.params;
    await postService.deletePosting(postingId);
    return res.status(200).json({ message: "postingDeleted" });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const likePosting = async (req, res) => {
  try {
    const { userId, postingId } = req.params;

    await postService.likePosting(userId, postingId);

    res.status(200).json({ message: "likeCreated" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = {
  posting,
  allPosts,
  patchPosting,
  deletePosting,
  likePosting,
};
