const postService = require('../services/postService');

const post = async (req,res) => {

    try {
        const {title, content, user_id, posting_img_url} = req.body;
        if(!title||!user_id) {
            res.status(400).json({message : 'KEY_ERROR'});
        }

        await postService.post(title, content, user_id, posting_img_url);
        return res.status(201).json({message:'POST_CREATED'});
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message : err.message});
    }
};

const allPosts = async (req, res) => {

    try {
        const data = await postService.allPosts();
        return res.status(200).json({"data" : data});
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode||500).json({message: err.message});
    }

};

const onesPosts = async(req, res) => {

    try {
        const user_id = req.params.user_id;
        if(!user_id) {
            res.status(400).json({message:'KEY_ERROR'});
        }

        const user = await postService.onesPosts(user_id);
        return res.status(200).json({"data" : user});
    } catch(err) {
        console.log(err);
        return res.status(err.statusCode||500).json({message : err.message});
    }

};

const updatePost = async(req, res) => {
    try {
        const post_id = req.params.post_id;

        const {title, content, posting_img_url, user_id} = req.body;

        if(!title || !post_id || !user_id) {
            res.status(400).json({message : 'KEY_ERROR'});
        }

        const data = await postService.updatePost(title, content, posting_img_url, user_id, post_id);

        return res.status(200).json({"data" : data});

    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message : err.message});
    }
};

const deletePost = async(req, res) => {
    try {
        const post_id = req.params.post_id;

        if(!post_id) {
            res.status(400).json({message : 'KEY_ERROR'});
        }

        await postService.deletePost(post_id);
        return res.status(204).json({message : "POSTING_DELETED"});

    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message : err.message});
    }
};

module.exports = {
    post,
    allPosts,
    onesPosts,
    updatePost,
    deletePost
}