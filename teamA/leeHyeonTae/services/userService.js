const userDao = require('../models/userDao');

const signUp = async ( name, email, profile_image, password) => {
    const pwValidation = new RegExp(
        '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.{8,20})'
    );
    if(!pwValidation.test(password)) {
        const err = new Error('PassWord is not valid!');
        err.statusCode = 400;
        throw err;
    }

    const createUser = await userDao.createUser(
        name,
        email,
        profile_image,
        password
    );

    return createUser;
};

module.exports = {
    signUp
}