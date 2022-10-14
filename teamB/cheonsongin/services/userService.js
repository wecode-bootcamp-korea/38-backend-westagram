const bcrypt = require('bcrypt');

const userDao = require('../models/userDao');

const signUp = async (name, email, profileImage, password) => {
  const PASSWORD_REGEX = new RegExp(
    '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
  );
  if (!PASSWORD_REGEX.test(password)) {
    const err = new Error('PASSWORD_IS_NOT_VALID');
    err.statusCode = 409;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const createUser = await userDao.createUser(
    name,
    email,
    profileImage,
    hashedPassword
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