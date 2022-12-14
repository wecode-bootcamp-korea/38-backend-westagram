const postService = require('../services/postService');

const registration = async (req, res) => {
  try {
    const { title, post_image, content, user_id } = req.body;

    if ( !title || !user_id ) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await postService.registration( title, post_image, content, user_id );
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

const modification = async (req, res) => {
  try {
    const { content, id, user_id } = req.body;

    if ( !content || !id || !user_id ) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    const data = await postService.modification( content, id, user_id );

    return res.status(201).json(data);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deletion = async (req, res) => {
  try {
    const { postId } = req.body;

    if ( !postId ) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    return res.status(200).json({ message: 'postingDeleted' });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};



module.exports = {
  registration,
  viewAllPosts,
  modification,
  deletion
}