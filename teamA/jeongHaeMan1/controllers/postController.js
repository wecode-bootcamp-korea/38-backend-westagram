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

const search = async (req, res, next) => {
    try {
        const search = await postService.search();

        return res.status(201).json({ data : search });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message : err.meassgae});
    }
};

const modify = async (req, res) => {
    try {
        const {content, postId} = req.body;

        if (  !content || !postId ) {
            return res.status(400).json({ message : 'KEY_ERROR' });
        }

        const result = await postService.modify( content, postId );

        res.status(201).json({ data : result });
    }
    catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message : err.meassgae});
    }
}

const deletePost = async(req, res) => {
    try{
        const deleteId = Number(req.params.id);
        await postService.deletePost(deleteId);

        return res.status(200).json({data : 'postingDeleted'})
    }
    catch (err) {
        console.error(err)
        return res.status(err.statusCode || 500).json({message:  err.message})
    }
}

module.exports = {
    write, search, modify, deletePost
}
