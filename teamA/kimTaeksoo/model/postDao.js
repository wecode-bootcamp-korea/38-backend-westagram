const myDataSource = require("../util/datasource");

const createPost = async (title, content, userId, postingImageUrl) => {
  try {
    await myDataSource.query(
      `INSERT INTO posts (
            title,
            content,
            user_id,
            posting_image_url
      ) VALUES (?,?,?,?)`,
      [title, content, userId, postingImageUrl]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const allPosts = async () => {
  try {
    const data = await myDataSource.query(
      `SELECT 
          u.id as userId,
          u.profile_image as userProfileImage,
          p.id as postingId,
          p.posting_image_url as postingImageUrl,
          p.content as postingContent 
      FROM users as u, posts as p`
    );
    return data;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const daoPatchPosting = async (userId, postingId, content) => {
  try {
    const userIdNumber = Number(userId);
    const postingIdNumber = Number(postingId);
    await myDataSource.query(
      `UPDATE posts SET content='${content}' WHERE user_id=${userIdNumber} AND id=${postingIdNumber}`
    );

    const data = await myDataSource.query(
      `SELECT 
        u.id as userId,
        u.name as userName,
        p.id as postingId,
        p.title as postingTitle,
        p.content as postingContent
   FROM users u, posts p
   WHERE u.id=${userIdNumber} AND p.id=${postingIdNumber};`
    );

    return data;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const deletePosting = async (postingId) => {
  try {
    await myDataSource.query(`DELETE FROM posts WHERE id=${postingId}`);
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const likePosting = async (userId, postingId) => {
  try {
    await myDataSource.query(
      `INSERT INTO likes (user_id, post_id) VALUES (?, ?)`,
      [userId, postingId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createPost,
  allPosts,
  daoPatchPosting,
  deletePosting,
  likePosting,
};
