const insertLikePosting = require('../services/likeService');

const like = async (req,res) => {
    try{
        const { user_id, post_id } = req.body;

        await insertLikePosting.like( user_id, post_id );
        
        return await res.status(200).json({message: "likeCreated"});
    }
    catch (err){
        console.error(err);
        return res.status(err.statusCode || 500).json({message:err.message});
    }
}

module.exports = { like };