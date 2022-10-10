const deletePostDao = require('../models/deletePostDao');

const deletes = async (deleteId) => {
    try{
    await deletePostDao.deletePost(deleteId);
    }
    catch(err){
        console.error(err);
        return res.status(err.statusCode || 500).json({message : err.message});
    }
    
}

module.exports = { deletes }