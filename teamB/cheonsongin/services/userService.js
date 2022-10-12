const userDao = require('../models/userDao');

const signUp = async (name, email, password, profileImage) => {
  const PASSWORD_REGEX = new RegExp(
    '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
  );
  if (!PASSWORD_REGEX.test(password)) {
    const err = new Error('PASSWORD_IS_NOT_VALID');
    err.statusCode = 409;
    throw err;
  }
  const createUser = await userDao.createUser(
    name,
    email,
    password,
    profileImage
  );

  return createUser;
};

const viewUserId = async (userId) => {
  const selectUserPost = await userDao.selectUserPost(userId);
  return selectUserPost;
}

module.exports = {
  signUp,
  viewUserId
}