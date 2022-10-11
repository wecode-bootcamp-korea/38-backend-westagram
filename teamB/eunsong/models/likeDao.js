const DaoModule = require("./DaoModule");

const createLike = async (userId, postId) => {
  try {
    return await DaoModule.database.query(`
      INSERT INTO likes(
        user_id,
        post_id
      ) VALUES (?, ?);`,
      [ userId, postId ]
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createLike
}