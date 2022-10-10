const { DataSource } = require('typeorm');

const appDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
});

appDataSource.initialize()
    .then( () => {
        console.log('Data Source has been initialzed');
    })
    .catch( (err) => {
        console.error('error occured during data source initalization',err);
        appDataSource.destroy();
    })


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