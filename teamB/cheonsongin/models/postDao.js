const createPost = async ( title, post_image, content, user_id ) => {
  try {
    return await appDataSource.query(
      `INSERT INTO posts(
        title,
        post_image,
        content,
        user_id
      ) VALUES (?, ?, ?, ?);
      `,
      [ title, post_image, content, user_id ]
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

const selectPost = async () => {
  try {
    return await appDataSource.query(
      `SELECT
        u.id AS userId,
        u.profile_image AS userProfileImage,
        p.id AS postingId,
        p.post_image AS postingImageUrl,
        p.content AS postingContent
      FROM users u
      INNER JOIN posts p ON u.id = p.user_id
      `
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

const updatePost = async ( content, id, user_id ) => {
  try {
    await appDataSource.query(
      `UPDATE posts
      SET
        content=?
      WHERE
        id=?
      AND user_id=?;
      `,
      [ content, id, user_id ]
    );
    return await appDataSource.query(
      `SELECT
        u.id AS userId,
        u.name AS userName,
        p.id AS postingId,
        p.title AS postingTitle,
        p.content AS postingContent
      FROM posts p
      INNER JOIN users u ON p.user_id = u.id
      WHERE p.user_id=${user_id};`
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
}; 

const deletePost = async ( postId ) => {
  try {
    return await appDataSource.query(
      `DELETE FROM posts
      WHERE id = ${postId};`,
      [ postId ]
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    throw error;
  }
};

module.exports = {
  createPost,
  selectPost,
  updatePost,
  deletePost
}