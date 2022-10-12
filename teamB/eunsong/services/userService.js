const userDao = require('../models/userDao')

const signUp = async (name, email, password, profileImage) => {
  const pwValidation = new RegExp(
    '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
  );
  if (!pwValidation.test(password)) {
    const err = new Error('PASSWORD_IS_NOT_VALID');
    err.statusCode = 400;
    throw err;
  }

  const emailValidation = new RegExp(
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
  );
  if (!emailValidation.test(email)) {
    const err = new Error('EMAIL_ADDRESS_IS_NOT_VALID');
    err.statusCode = 400;
    throw err;
  }

  const emailList = await userDao.emailList();
  for (let i = 0; i < emailList.length; i++) {
    if (email === emailList[i].email) {
      const err = new Error('DUPLICATE_EMAIL');
      err.statusCode = 400;
      throw err;
    }
  }
  
  const createUser = await userDao.createUser(
    name,
    email,
    password,
    profileImage
  );

  return createUser;
};

const updatePost = async (userId, postId, title, content) => {
  return await userDao.patchUpdatePost(
    userId,
    postId,
    title,
    content
  );
};

module.exports = {
  signUp,
  updatePost
}