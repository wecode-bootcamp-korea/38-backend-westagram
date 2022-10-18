const { userDao } = require('../models');

 const signUp = async (name, email, password, profileImage) => {
     const createUser = await userDao.createUser(
          name,
          email,
          password,
          profileImage
     );
     return createUser;
 }

module.exports = { signUp };