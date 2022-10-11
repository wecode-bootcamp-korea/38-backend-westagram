//controller/postController.js

const postService = require('../services/postService');

const write = async (req, res) => {
    try {
        const { title, content, user_id, image_url } = req.body;

        if ( !title|| !content || !user_id || !image_url ) {
            return res.status(400).json({ meassgae : 'KEY_ERROR' });
        }

        await postService.write( title, content, user_id, image_url );

        res.status(201).json({ message : 'postCreated' });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message : err.meassgae});
    }
};

module.exports = {write}
