const updatePostService = require('../services/updatePostService');

const update = async ( req, res ) => {
    try{
       
        const { userId, postId, title, content} = req.body;

        await updatePostService.update(Number(userId), Number(postId), title, content);

        
        const resultUpdate = await updatePostService.update(Number(userId), Number(postId), title, content);


        // console.log(resultUpdate);
        return res.status(200).json({data: resultUpdate});
    }
    catch (err){
        console.error(err);
        return res.status(err.statusCode || 500).json({message : err.message});
    }
}

module.exports = {update};