const router = require('../routes');
const postService = require('../services/postService');

const post = async (res, req) => {

    try {
        const {title, content, user_id, posting_img_url} = req.body;
        if(!title||!content||!user_id||!posting_img_url) {
            res.status(400).json({message : 'KEY_ERROR'});
        }

        await postService.post(title, content, user_id, posting_img_url);
        return res.status(201).json({message:'postCreated'});
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message : err.message});
    }
};

module.export = {
    post
}