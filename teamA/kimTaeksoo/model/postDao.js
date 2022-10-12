const myDataSource = require("../util/datasource");

const createPost = async (title, content, userId, postingImageUrl) => {
  await myDataSource.query(
    `INSERT INTO posts (
          title,
          content,
          user_id,
          posting_image_url
    ) VALUES (?,?,?,?)`,
    [title, content, userId, postingImageUrl]
  );
};

const allPosts = async () => {
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
};

const daoPatchPosting = async (userId, postingId, content) => {
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
};

const deletePosting = async (postingId) => {
  await myDataSource.query(`DELETE FROM posts WHERE id=${postingId}`);
};

const likePosting = async (userId, postingId) => {
  await myDataSource.query(
    `INSERT INTO likes (user_id, post_id) VALUES (?, ?)`,
    [userId, postingId]
  );
};

module.exports = {
  createPost,
  allPosts,
  daoPatchPosting,
  deletePosting,
  likePosting,
};
