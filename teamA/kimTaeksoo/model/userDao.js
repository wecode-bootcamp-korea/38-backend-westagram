const myDataSource = require("../util/datasource");

const createUser = async (name, email, profileImage, password) => {
  try {
    await myDataSource.query(
      `INSERT INTO users (
        name,
        email,
        profile_image,
        password
    ) VALUES (?,?,?,?)`,
      [name, email, profileImage, password]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const getUser = async () => {
  try {
    const data = await myDataSource.query(
      `SELECT
          u.id,
          u.email,
          u.profile_image,
          u.password
      FROM users as u`
    );
    return data;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const userIdMatchPosts = async () => {
  try {
    const data = await myDataSource.query(
      `SELECT
          p.user_id as postingId,
          p.posting_image_url as postingImageUrl,
          p.content as postingContent
      FROM posts as p`
    );
    return data;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = { createUser, userIdMatchPosts, getUser };
