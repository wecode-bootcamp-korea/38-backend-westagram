const searchPostService = require('../services/searchPostService');

const search = async (req, res) => {
    try{
        const search = await searchPostService.search();
        return res.status(201).json({ "data": search});
    }
    catch (err){
        console.error(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
}

module.exports = {
    search
}