const { likesDao } = require('../models');

 const posting = async ( user_id, post_id ) => {
     const createLike = await likesDao.createLike(
          user_id,
          post_id
     );
     return createLike;
}



module.exports = { posting };