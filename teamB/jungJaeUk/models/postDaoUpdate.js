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

module.exports = { updatePost };