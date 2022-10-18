const { likesService } = require('../services');

const posting = async (req, res) => { 
     const { user_id, post_id } = req.body;

     await likesService.posting( user_id, post_id );
     
     return res.status(201).json({ message : "likeCreated"});
}

module.exports = { posting };

