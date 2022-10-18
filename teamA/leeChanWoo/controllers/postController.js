const { postService } = require('../services');

const posting = async (req, res) => { 
     const { title, content, user_id } = req.body;

     try {
          await postService.posting( title, content, user_id );
          
          return res.status(201).json({ message : "postCreated"});
     } catch (error) {
          res.status(error.statusCode).json({ message : error.message });
     }
}

const viewPost = async (req, res) => { 

     const allPost = await postService.viewPost();
     
     return res.status(200).json({ message : allPost });
}

const viewUserPost = async (req, res) => {
     const { userID } = req.params;

     const userPost = await postService.viewUserPost(userID);

     return res.status(200).json({ userPost });
}

const updatePost = async (req, res) => {
     const { postID } = req.params;
     const { content } = req.body;

     const updatedPost = await postService.updatePost(postID, content);

     return res.status(200).json({data : updatedPost});
}

const deleting = async (req, res) => {
     const { postID } = req.params;

     await postService.deleting(postID);

     return res.status(200).json({ message : "postingDeleted"});
}


module.exports = { posting, viewPost, viewUserPost, updatePost, deleting };


