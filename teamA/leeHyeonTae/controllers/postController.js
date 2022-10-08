const postService = require('../services/postService');

const posts = async (req, res) => {
    try{
        const { title, content, posting_image, user_id } = req.body;

        await postService.posts( title, content, posting_image, user_id);
        return res.status(201).json({message: "posts created"});
    }
    catch (err){
        console.error(err);
        return res.status(err.statusCode || 500).json({message : err.message});
    }
}

const search = async (req, res) => {
    try{
        const search = await postService.search();
        return res.status(201).json({ "data": search});
    }
    catch (err){
        console.error(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
}

module.exports = {
    posts,search
}