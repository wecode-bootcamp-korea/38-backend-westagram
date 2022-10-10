const searchPostService = require('../services/specificSearchPostService');

const specificPostSearch = async (req, res) => {
    try{
        let id = Number(req.params.id);
        await searchPostService.resultSpecific(id);

        const resultSpecific = await searchPostService.resultSpecific(id);
        return res.status(201).json({data: resultSpecific});
        
    }
    catch (err){
        console.error(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
}

module.exports = { specificPostSearch }