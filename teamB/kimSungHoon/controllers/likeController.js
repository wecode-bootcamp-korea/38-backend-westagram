const likeService = require('../services/likeService');

const like = async (req, res) => {
    try {
        const {user_id, post_id} = req.body;

        if( !user_id || !post_id ){   
            return res.status(400).json({message: '키 에러 발생'});
        }

        const result = await likeService.like(user_id, post_id);
        return res.status(201).json({ "message" : "likeCreated" });
    }
    catch(err){
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
}

module.exports = {
	like
}
