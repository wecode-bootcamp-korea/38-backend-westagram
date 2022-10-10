const { DataSource } = require('typeorm');

const appDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
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
            const a = await appDataSource.query(
                `INSERT INTO posts(title, content, url_image, user_id) VALUES(?, ?, ?, ?)`,
                [title, content, url_image, user_id]
            );

            return a;
        }
        catch (err){
            console.log(err);
            const error = new Error('invalid data input3443 ddd');
            err.statusCode = 500;
            throw error;
        }
    }

    module.exports = {
        createPost
    }