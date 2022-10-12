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