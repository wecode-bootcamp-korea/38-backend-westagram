const deletePostDao = require("../models/deletePostDao");

const deletePost = async(deleteId) => {
    try {
        await deletePostDao.deletePost(deleteId);
    } catch (err) {
        console.error(err);
        //return deleteId.status(err.statusCode || 500).json({message : err.message})
    }
}

module.exports = {
    deletePost
}