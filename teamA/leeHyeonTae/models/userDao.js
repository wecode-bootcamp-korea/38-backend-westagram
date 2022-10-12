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
        console.log("Data Soucre has been initialized!");
    })
    .catch( (err) =>{
        console.error('Error occured during Data Source initalization', err);
        appDataSource.destroy();
    });


const createUser = async ( name, email, profile_image, password ) => {
    try{
        return await appDataSource.query(
            `INSERT INTO users (
                name,
                email,
                profile_image,
                password
            ) VALUES ( ?,?,?,? );`
            , [ name, email, profile_image, password]
        );
    }
    catch (err){
        const error = new Error('invalid data input');
        error.statusCode = 500;
        throw error;

    }
};

module.exports = {
    createUser
}