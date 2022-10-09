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

const postsListAll = async ( userId ) => {
  try {
    const posts = await mysqlDataSource.query(
      `
      SELECT
        posts.id as postingId,
        posts.profile_url as postingImageUrl,
        posts.content as postingContent
      FROM posts
      WHERE user_id=${userId};
      `
    );
    const user = await mysqlDataSource.query(
      `
      SELECT
        users.id as userId,
        users.profile_image as userProfileImage
      FROM users
      WHERE id=${userId};
      `
    );

    user[0]['postings'] = posts;

    return user;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = { postsListAll };