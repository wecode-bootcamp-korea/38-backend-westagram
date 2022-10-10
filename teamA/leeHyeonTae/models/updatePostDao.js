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


    const updatePost = async ( userId, postId, title, content ) => {
        try{
            
             await appDataSource.query(
                `UPDATE posts SET user_id=?,title=?,content=? WHERE id=${postId}`,[userId,title,content]);
                const a = await appDataSource.query(
                    `SELECT user_id as userId,(SELECT name FROM users WHERE id=${userId}) as userName,id as postingId,title as postingTitle,content as postingContent FROM posts WHERE id=${userId}`);
                    console.log(a);
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