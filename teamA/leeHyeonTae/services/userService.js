const userDao = require('../models/userDao');

const signUp = async ( name, email, profile_image, password) => {
    try{
    
    // console.log(password);
    // const pwValidation = new RegExp(
    //     '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.{8,20})'
    // );
    // if(!pwValidation.test(password)) {
    //     const err = new Error('INVALID_PASSWORD');
    //     err.statusCode = 400;
    //     throw err;
    // }

    const createUser = await userDao.createUser(
        name,
        email,
        profile_image,
        password
    );

    return createUser;
    }
    catch (err){
        console.log(err);
        const error = new Error('invalid data input');
        error.statusCode = 500;
        throw error;
    }
}
module.exports = {
    signUp
}