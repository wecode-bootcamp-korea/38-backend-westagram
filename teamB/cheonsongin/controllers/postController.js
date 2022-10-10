const postService = require('../services/postService');

const upload = async (req, res) => {
  try {
    const { title, post_image, content, user_id } = req.body;

    if ( !title || !user_id ) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await postService.upload( title, post_image, content, user_id );
    return res.status(201).json({
      message: 'UPLOAD_SUCCESS',
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message});
  }
};

const viewAllPosts = async (req, res) => {
  try {
    const result = await postService.viewAllPosts();
    return res.status(200).json({"data" : result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message});
  }
};

const viewUserId = async (req, res) => {
  try {
    const userId = req.params.userid;

    const data = await postService.viewUserId(userId);

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
  upload,
  viewAllPosts,
  viewUserId
}