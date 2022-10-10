const deletePostService = require('../services/deletePostService');

const deletes = async (req, res) => {
    try{
        const deleteId = Number(req.params.id);
        await deletePostService.deletes(deleteId);

        return res.status(200).json({message : "postDeleted"});
    }
    catch(err){
        console.error(err);
        return res.status(err.statusCode || 500).json({message : err.message});
    }
}

module.exports = { deletes };