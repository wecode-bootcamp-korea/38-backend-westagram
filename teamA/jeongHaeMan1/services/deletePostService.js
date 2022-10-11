const deletePostDao = require("../models/deletePostDao");

const deletePost = async(deleteId) => {
    try {
        await deletePostDao.deletePost(deleteId);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    deletePost
}