const postService = require('../services/postService');

const post = async (req, res) => {
  try {
    const { user_id, title, content} = req.body;

    await postService.post( user_id, title, content );
    return res.status(201).json({message: 'postCreated'});
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
	post
}