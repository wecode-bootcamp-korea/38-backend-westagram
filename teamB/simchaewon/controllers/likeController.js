const likeService = require("../services/likeService");

const click = async(req, res)=>{
  try {
    const {userId, postId} =req.body;

    if(!userId || !postId) {
      return res.status(400).json({message:"KEY_ERROR"});
    }
    await likeService.click(userId, postId);
    res.status(200).json({message:"CLICKED_SUCCESS"});
    }
  catch (err) {
   return res.status(err.statusCode || 500).json({message : err.message})
  }
}

module.exports={click};