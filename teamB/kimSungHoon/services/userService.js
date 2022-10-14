const userDao = require('../models/userDao');

const signUp = async (name, email, password, profile_image) => {

    const createUser = await userDao.createUser(
        name,
        email,
        password,
        profile_image
    );
        
    return createUser;
 };

const userPosting = async (userId) => {
    const result = await userDao.userPosting(userId);
    return result;
 };

module.exports = {
    signUp,
    userPosting
}