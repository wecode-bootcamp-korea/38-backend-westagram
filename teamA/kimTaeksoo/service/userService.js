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
