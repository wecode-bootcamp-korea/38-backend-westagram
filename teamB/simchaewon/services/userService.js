const userDao = require("../models/userDao");

const signUp = async (name, email, password, profileImage) => {

  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );
  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    console.log("eeerrorr userservice", err)
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


const readUserAllPosts =async(userName)=>{
  const getUserPosts = await userDao.getUserPosts(userName);
  return getUserPosts;
}

module.exports = {
  signUp,
  readUserAllPosts
};
