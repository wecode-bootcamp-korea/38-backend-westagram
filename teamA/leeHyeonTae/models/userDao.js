const appDataSource = require('../utils/typeorm');

const createUser = async ( name, email, profile_image, password ) => {
    console.log(name, email, profile_image, password);
    try{
        return await appDataSource.query(
            `INSERT INTO users (
                name,
                email,
                profile_image,
                password
            ) VALUES (?,?,?,?);`
            ,[name, email, profile_image, password]
        );
    }
    catch (err){
        console.log(err);
        const error = new Error('invalid data input');
        error.statusCode = 500;
        throw error;
    }
};


module.exports = { createUser }