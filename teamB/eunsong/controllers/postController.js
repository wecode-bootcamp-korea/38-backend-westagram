const postService = require('../services/postService');

const postUp = async (req, res) => {
  try {
    const { title, content, user_id, posting_image } = req.body

    if ( !title || !content || !user_id || !posting_image ) {
      return res.status(400).json({ message : 'KEY_ERROR' });
    }

    await postService.postUp(title, content, user_id, posting_image);

    return res.status(201).json({ message : 'POST_CREATED' });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message : err.message });
  }
};

const postsList = async (req, res) => {
  try {
    const data = await postService.postsList();
    
    return res.status(200).json({
      data
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message : err.message });
  }
};

const postsListByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const data = await postService.postsListByUser(userId);

    return res.status(200).json(data)
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message : err.message });
  }
};

const postDown = async (req, res) => {
  try {
    const postId = req.params.postId;

    await postService.postDown(postId);

    return res.status(200).json({ message : 'POSTING_DELETED'});
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message : err.message });
  }
};

module.exports = {
  postUp,
  postsList,
  postsListByUser,
  postDown
}