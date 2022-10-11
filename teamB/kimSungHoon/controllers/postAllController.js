const postAllService = require('../services/postAllService');

const readingPost = async (req, res) => {
    try {
        const result = await postAllService.readingPost();
        return res.status(201).json({ data: result });
    }
    catch(err){
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

module.exports = {
	readingPost
}
