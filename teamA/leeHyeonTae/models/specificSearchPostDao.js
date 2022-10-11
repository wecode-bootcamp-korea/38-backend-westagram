const appDataSource = require('../utils/typeorm');



    const specificSearchPost = async ( userId ) => {
        try {
          const posts = await appDataSource.query(
            `SELECT
                    posts.id as postingId,
                    posts.url_image as postingImageUrl,
                    posts.content as postingContent
                FROM posts
                WHERE user_id=${userId};`
          );
          const users = await appDataSource.query(
            `SELECT
                    users.id as userId,
                    users.profile_image as userProfileImage
                FROM users
                WHERE id=${userId};`
          );
          users[0]['postings'] = posts;
      
          return users;
        }
        catch (err){
            const error = new Error('invalid data search');
            err.statusCode = 500;
            throw error;
        }
    }

    module.exports = { specificSearchPost}