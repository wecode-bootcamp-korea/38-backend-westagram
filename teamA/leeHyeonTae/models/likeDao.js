const appDataSource = require('../utils/typeorm');

    const createLike = async (user_id,post_id) => {
        try{
            return await appDataSource.query(
                `INSERT INTO likes(
                        user_id,
                        post_id
                    ) VALUES (?,?)`
                    ,[user_id,post_id]
            );
        }
        catch(err){
            console.error('like Data Error');
            appDataSource.destroy();
        }
    }

    module.exports={createLike}