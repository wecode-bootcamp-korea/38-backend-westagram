const postService = require('../services/postService');

const post = async (req,res) => {

    try {
        const {title, content, user_id, posting_img_url} = req.body;
        if(!title||!user_id) {
            res.status(400).json({message : 'KEY_ERROR'});
        }

        await postService.post(title, content, user_id, posting_img_url);
        return res.status(201).json({message:'postCreated'});
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
        const {user_id} = req.body;
        if(!user_id) {
            res.status(400).json({message:'KEY_ERROR'});
        }

        const user = await postService.onesPosts(user_id);
        return res.status(200).json({"data" : user});
    } catch(err) {
        console.log(err);
        return res.status(err.statusCode||500).json({message:err.message});
    }

};

module.exports = {
    post,
    allPosts,
    onesPosts
}