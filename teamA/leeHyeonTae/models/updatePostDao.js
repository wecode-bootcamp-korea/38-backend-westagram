const appDataSource = require('../utils/typeorm');


    const updatePost = async ( userId, postId, title, content ) => {
        try{
            
             await appDataSource.query(
                `UPDATE posts SET user_id=?,title=?,content=? WHERE id=${postId}`,[userId,title,content]);
            return await appDataSource.query(
                `SELECT user_id as userId,(SELECT name FROM users WHERE id=${userId}) as userName,id as postingId,title as postingTitle,content as postingContent FROM posts WHERE user_id=${userId} AND id=${postId}`
            );
            
        }
        catch(err) {
            const error = new Error(err.message);
            err.statusCode = 500;
            throw error;
        }
    }

    module.exports= { updatePost }