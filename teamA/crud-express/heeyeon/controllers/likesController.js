const likesService = require('../services/likesService');

const pressLikes = async(req, res) => {

    try {
        const {post_id, user_id} = req.body;
        if(!post_id || !user_id) {
            const err = new Error('KEY_ERROR');
            err.statusCode(400);
            throw err;
        }

        await likesService.pressLikes(post_id, user_id);
        return res.status(201).json({message : "LIKE_CREATED"})
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message : err.message});
    }

};

module.exports = {
    pressLikes
}