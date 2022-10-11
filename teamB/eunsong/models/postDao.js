const DaoModule = require("./DaoModule");

const createPost = async (title, content, user_id, posting_image) => {
  try {
    return await DaoModule.database.query(`
      INSERT INTO posts(
        title,
        content,
        user_id,
        posting_image
      ) VALUES (?, ?, ?, ?);`,
      [ title, content, user_id, posting_image ]
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

const getPostsList = async () => {
  try {
    const data = await DaoModule.database.query(`
      SELECT
        p.id AS postingId,
        p.user_id AS userId,
        p.posting_image AS postingImageUrl,
        p.title AS postingTitle,
        p.content AS postingContent,
        u.profile_image AS userProfileImage
      FROM posts p
      JOIN users u ON p.user_id = u.id`
    );
    return data;
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

const getPostsListByUser = async (userId) => {
  try {
    const user = await DaoModule.database.query(`
      SELECT
        u.id AS userId,
        u.profile_image AS userProfileImage
      FROM users u
      WHERE id = ${userId}`
    );
  
    const postings = await DaoModule.database.query(`
      SELECT
        p.id AS postingId,
        p.posting_image AS postingImageUrl,
        p.content AS postingContent,
        p.title AS postingTitle
      FROM posts p
      WHERE user_id = ${userId}`
    );
  
    user[0].postings = postings;

    return user;
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

const deletePost = async (postId) => {
  try {
    return await DaoModule.database.query(`
      DELETE FROM posts
      WHERE posts.id = ${postId}`
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createPost,
  getPostsList,
  getPostsListByUser,
  deletePost
}