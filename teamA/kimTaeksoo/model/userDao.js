const myDataSource = require("../util/datasource");

const createUser = async (name, email, profileImage, hashedPassword) => {
  await myDataSource.query(
    `INSERT INTO users (
        name,
        email,
        profile_image,
        password
    ) VALUES (?,?,?,?)`,
    [name, email, profileImage, hashedPassword]
  );
};

const getUser = async () => {
  const data = await myDataSource.query(
    `SELECT
        u.id,
        u.email,
        u.profile_image,
        u.password
    FROM users as u`
  );
  return data;
};

const userIdMatchPosts = async () => {
  const data = await myDataSource.query(
    `SELECT
        p.user_id as postingId,
        p.posting_image_url as postingImageUrl,
        p.content as postingContent
    FROM posts as p`
  );
  return data;
};

module.exports = { createUser, userIdMatchPosts, getUser };
