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

module.exports = {
  upload
}