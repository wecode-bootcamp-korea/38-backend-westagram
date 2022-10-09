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

module.exports = { deletePost };