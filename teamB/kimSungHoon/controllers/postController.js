const postService = require('../services/postService');

const createPost = async (req, res) => {
    try {
        const {title, content, user_id} = req.body;

        if( !title || !content || !user_id ){   
            return res.status(400).json({message: '키 에러 발생'});
        }

        await postService.createPost(title, content, user_id);
        return res.status(201).json({message: '게시글 등록 성공'});
    }
    catch(err){
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

const readingPost = async (req, res) => {
    try {
        const result = await postService.readingPost();
        return res.status(201).json({ data: result });
    }
    catch(err){
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

const updatePost = async (req, res) => {
    try {
        const {content, id} = req.body;

        if( !id || !content ){   
            return res.status(400).json({message: '키 에러 발생'});
        }
        const data = await postService.updatePost(content, id);
        return res.status(201).json(data)
    }
    catch(err){
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
}

const deletePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const result = await postService.deletePost(postId);
        return res.status(201).json({ "message" : "postingDeleted" });
    }
    catch(err){
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
}

module.exports = {
	createPost,
    readingPost,
    updatePost,
    deletePost
}