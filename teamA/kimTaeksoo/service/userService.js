const userDao = require("../model/userDao");

const signUp = async (name, email, profileImage, password) => {
  const createUser = await userDao.createUser(
    name,
    email,
    profileImage,
    password
  );

  return createUser;
};

module.exports = { signUp };
