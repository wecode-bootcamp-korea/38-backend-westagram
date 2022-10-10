const postService = require('../services/postService');

const posts = async (req, res) => {
    try{
        const { title, content, url_image, user_id } = req.body;

        await postService.posts( title, content, url_image, user_id);
        return res.status(201).json({message: "posts created"});
    }
    catch (err){
        console.error(err);
        return res.status(err.statusCode || 500).json({message : err.message});
    }
}

const search = async (req, res) => {
    try{
        const search = await postService.search();
        return res.status(201).json({ "data": search});
    }
    catch (err){
        console.error(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
}

const specificPostSearch = async (req, res) => {
    try{
        let id = Number(req.params.id);
        await postService.specificPostSearch(id);

        const resultSpecific = await postService.resultSpecific(id);
        return res.status(201).json({data: resultSpecific});
        
    }
    catch (err){
        console.error(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
}

const update = async ( req, res ) => {
    try{
       
        const { userId, postId, title, content} = req.body;

        await postService.update(Number(userId), Number(postId), title, content);

        
        const resultUpdate = await postService.update(Number(userId), Number(postId), title, content);
        return res.status(200).json({data: resultUpdate});
    }
    catch (err){
        console.error(err);
        return res.status(err.statusCode || 500).json({message : err.message});
    }
}

const deletes = async (req, res) => {
    try{
        const deleteId = req.params.id;
        await postService.deletes(deleteId);

        return res.status(200).json({message : "postDeleted"});
    }
    catch{

    }
}

module.exports = {
    posts,search,specificPostSearch,update,deletes
}