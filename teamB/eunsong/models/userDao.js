const { DataSource } = require('typeorm');

const database = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
})

database.initialize()
  .then(() => {
    console.log("Data Source in userDao has been initialized!");
  })
  .catch((err) => {
    console.error("Error occurred during Data Source initialization", err);
    database.destroy();
  });

const createUser = async (name, email, password, profileImage) => {
  try {
    return await database.query(`
      INSERT INTO users(
        name,
        email,
        password,
        profile_image
      ) VALUES (?, ?, ?, ?);`,
      [ name, email, password, profileImage ]
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

const patchUpdatePost = async (userId, postId, title, content) => {
  try {
    await database.query(`
      UPDATE posts
      SET title = ?,
        content = ?
      WHERE user_id = ${userId} AND id = ${postId}`,
      [ title, content ]
    );

    const data = await database.query(`
      SELECT
        p.user_id AS userId,
        u.name AS userName,
        p.id AS postingId,
        p.title AS postingTitle,
        p.content AS postingContent
      FROM posts p
      JOIN users u ON p.user_id = u.id
      WHERE p.user_id = ${userId} AND p.id = ${postId}`
    );

    return data;
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createUser,
  patchUpdatePost
}