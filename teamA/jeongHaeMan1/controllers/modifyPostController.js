const getPostService = require("../services/modifyPostService");

const modify = async (req, res) => {
    try {
        const {content, postId} = req.body;

        if (  !content || !postId ) {
            return res.status(400).json({ message : 'KEY_ERROR' });
        }

        const result = await getPostService.modify( content, postId );

        res.status(201).json({ data : result });
    }
    catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message : err.meassgae});
    }
}
module.exports = {
    modify
}