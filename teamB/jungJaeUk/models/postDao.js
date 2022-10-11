const { DataSource } = require("typeorm");

const mysqlDataSource = new DataSource({
  type: process.env.TYPOEORM_CONNECTION,
  host: process.env.TYPOEORM_HOST,
  port: process.env.TYPOEORM_PORT,
  username: process.env.TYPOEORM_USERNAME,
  password: process.env.TYPOEORM_PASSWORD,
  database: process.env.TYPOEORM_DATABASE
});

mysqlDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch(() => {
    console.error("Error occurred during Data Source initialization", err);
    mysqlDataSource.destroy();
  });

const createPost = async ( title, content, user_id ) => {
  try {
    return await mysqlDataSource.query(`
      INSERT INTO posts
      (
        title,
        content,
        user_id
      )
      VALUES ( ?, ?, ? );`,
      [ title, content, user_id ]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const postsAll = async () => {
  try {
    return await mysqlDataSource.query(`
      SELECT
        users.id as userId,
        users.profile_image as userProfileImage,
        posts.id as postingId,
        posts.profile_url as postingImageUrl,
        posts.content as postingContent
      FROM users
      INNER JOIN posts ON users.id = posts.user_id;`
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const deletePost = async ( post_id ) => {
  try {
    return await mysqlDataSource.query(`
    DELETE
    FROM posts
    WHERE id=${post_id};`
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const likePost = async ( user_id, post_id ) => {
  try {
    return await mysqlDataSource.query(`
    INSERT INTO likes
      (
      user_id,
      post_id
      )
    VALUES (${user_id}, ${post_id});`
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const likeCheck = async () => {
  try {
    return await mysqlDataSource.query(`
    SELECT 
      likes.user_id,
      likes.post_id
    FROM likes;`
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const updatePost = async ( user_id, post_id, content ) => {
  try {
    const posts = await mysqlDataSource.query(`
      UPDATE posts
      SET content="${content}"
      WHERE user_id=${user_id} AND id=${post_id};`
    );
    const user = mysqlDataSource.query(`
      SELECT
        users.id as userId,
        users.name as userName,
        posts.id as postingId,
        posts.title as postingTitle,
        posts.content as postingContent
      FROM users
      INNER JOIN posts ON users.id = posts.user_id
      AND users.id=${user_id} AND posts.id=${post_id};`
    );

    return user;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = { 
  updatePost,
  likePost,
  likeCheck,
  deletePost,
  postsAll,
  createPost
};