const userDao = require("../model/userDao");
const bcrypt = require("bcrypt");

const signUp = async (name, email, profileImage, password) => {
  const pwd = password;
  const saltRounds = 12;

  const hashedPassword = await bcrypt.hash(pwd, saltRounds);

  const createUser = await userDao.createUser(
    name,
    email,
    profileImage,
    hashedPassword
  );

  return createUser;
};

const userIdMatchPosts = async (reqUserId) => {
  const userMatchPostingData = [];
  const userdata = await userDao.getUser();
  const postingdata = await userDao.userIdMatchPosts();
  const userIndex = await userdata.findIndex(
    (el) => el.id === Number(reqUserId.userId)
  );

  for (let i = 0; i < postingdata.length; i++) {
    if (postingdata[i].postingId === Number(reqUserId.userId)) {
      userMatchPostingData.push(postingdata[i]);
    }
  }

  const data = {
    userId: userdata[userIndex].id,
    userProfileImage: userdata[userIndex].profile_image,
    postings: userMatchPostingData,
  };

  return data;
};

module.exports = { signUp, userIdMatchPosts };
