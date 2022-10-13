const { appDataSource } = require('../utils/appDataSource');

const createUser = async ( name, email, password, profileImage ) => {
  try {
    return await appDataSource.query(
      `INSERT INTO users(
        name,
        email,
        password,
        profile_image
      ) VALUES (?, ?, ?, ?);
      `,
      [ name, email, password, profileImage ]
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

const selectUserPost = async (userId) => {
  try {
    const users = await appDataSource.query(
      `SELECT
        u.id AS userId,
        u.profile_image AS userProfileImage
      FROM users u
      WHERE id=${userId}`
    );
    const postsings = await appDataSource.query(
      `SELECT
        p.id AS postingId,
        p.post_image AS postingImageUrl,
        p.content AS postingContent
      FROM posts p
      WHERE user_id=${userId}`
    );
    users[0].posting = postsings;
    return users;
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createUser,
  selectUserPost
}