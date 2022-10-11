const likesService = require('../services/likesService');

const likes = async(req, res) => {
    try { 
        const {user_id, post_id} = req.body;

        await likesService.likes(user_id, post_id)

        return await res.status(200).json({message: 'likeCreated'})
    }
    catch(err) {
        console.error(err);
        return res.status(err.statusCode || 500).json({message: err.message})
    }
}

module.exports = {
    likes
}