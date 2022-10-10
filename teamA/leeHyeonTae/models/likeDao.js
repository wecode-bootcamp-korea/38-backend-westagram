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
    });


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