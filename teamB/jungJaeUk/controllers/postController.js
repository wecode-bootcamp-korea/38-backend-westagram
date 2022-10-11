const postService = require("../services/postService");

const postsAdd = async (req, res) => {
  try {
    const { title, content, user_id } = req.body;

    if ( !title || !content || !user_id ) {
      return res.status(400).json({ "message" : "KEY_ERROR" });
    }

    await postService.postsAdd( title, content, user_id );

    res.status(201).json({ "data" : "postCreated" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ "message" : err.message });
  }
};

const postsAll = async (req, res) => {
  try {
    const result = await postService.postsAll();

    res.status(200).json({ "data" : result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ "message" : err.message });
  };
};

const postsDelete = async (req, res) => {
  try {
    const { post_id } = req.body;

    if ( !post_id ) {
      return res.status(400).json({ "message" : "KEY_ERROR" });
    }

    await postService.postsDelete( post_id );

    res.status(200).json({ "data" : "postDeleted" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ "message" : err.message });
  }
};

const postsLike = async (req, res) => {
  try {
    const { user_id, post_id } = req.body;

    if ( !user_id || !post_id ) {
      return res.status(400).json({ "message" : "KEY_ERROR" });
    }

    await postService.postsLike( user_id, post_id );

    res.status(201).json({ "data" : "likeCreate" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ "message" : err.message });
  }
};

const postsUpdate = async (req, res) => {
  try {
    const { user_id, post_id, content } = req.body;

    if ( !user_id || !post_id || !content ) {
      return res.status(400).json({ "message" : "KEY_ERROR" });
    }

    const result = await postService.postsUpdate( user_id, post_id, content );

    res.status(200).json({ "data" : result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ "message" : err.message });
  }
};

module.exports = { 
  postsUpdate,
  postsLike,
  postsDelete,
  postsAll,
  postsAdd
};