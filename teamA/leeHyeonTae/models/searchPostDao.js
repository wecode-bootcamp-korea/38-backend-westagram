const appDataSource = require('../utils/typeorm');



    const searchPost = async () => {
        try{
            return await appDataSource.query(
                `SELECT 
                        posts.id as postingId,
                        posts.content as postingContent,
                        posts.url_image as postingImageUrl,
                        posts.user_id as userId,
                        users.profile_image as userProfileImage
                    FROM (posts, users)
                    WHERE users.id=posts.user_id;`
            )
        }
        catch(err){
            const error = new Error('invalid data search!')
            err.statusCode = 500;
            throw error;
        }
    }


    module.exports = { searchPost };