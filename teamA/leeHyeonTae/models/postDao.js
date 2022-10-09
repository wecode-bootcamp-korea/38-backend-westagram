const { DataSource } = require('typeorm');
const util = require('util');

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

    const createPost = async ( title, content, url_image, user_id) => {
        try{
            return await appDataSource.query(
                `INSERT INTO posts(
                    title,
                    content,
                    url_image,
                    user_id
                ) VALUES ( ?,?,?,? )`
                , [ title, content, url_image, user_id]
            )
        }
        catch (err){
            const error = new Error('invalid data input');
            err.statusCode = 500;
            throw error;
        }
    }

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


    const specificSearchPost = async (id) => {
        try{
            const numberId = Number(id);
            return await appDataSource.query(
                `SELECT 
                        id,
                        content,
                        url_image
                    FROM posts
                    WHERE posts.user_id=${numberId}`
                        
            );

        }
        catch (err){
            const error = new Error('invalid data search')
            err.statusCode = 500;
            throw error;
        }
    }

    const specificSearchUserImgUrl = async (id) => {
        try{
            const numberId = Number(id);
            return await appDataSource.query(
                `SELECT 
                        profile_image
                    FROM users
                    WHERE id=${numberId}`
            );
        }
        catch (err){
            const error = new Error('invalid data search');
            err.statusCode = 500;
            throw error;
        }
    }

    

    module.exports = {
        createPost,searchPost,specificSearchPost,specificSearchUserImgUrl
    }