const userDao = require('../models/userDao')

const signUp = async (name, email, password, profileImage) => {
    const createUser = await userDao.createUser(
        name,
        email,
        password,
        profileImage
    );

    return createUser;
};

const select = async (userId) => {
    const createSelectUser = await userDao.createSelectUser(userId);

    return createSelectUser;

}

module.exports = {
    signUp, select
}