const deletePostService = require("../services/deletePostService");

const deletePost = async(req, res) => {
    try{
        const deleteId = Number(req.params.id);
        await deletePostService.deletePost(deleteId);

        return res.status(200).json({data : 'postingDeleted'})
    }
    catch (err) {
        console.error(err)
        return res.status(err.statusCode || 500).json({message:  err.message})
    }
}

module.exports = {
    deletePost
}