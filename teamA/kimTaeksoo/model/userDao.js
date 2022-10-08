const { DataSource } = require("typeorm");

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

myDataSource.initialize().then(() => {
  console.log("data source has been init");
});

const createUser = async (name, email, profileImage, password) => {
  await myDataSource.query(
    `INSERT INTO users (
            name,
            email,
            profile_image,
            password
        ) VALUES (
            ?,
            ?,
            ?,
            ?
        )`,
    [name, email, profileImage, password]
  );
};

const getUser = async () => {
  const data = await myDataSource.query(
    `
    SELECT
    u.id,
    u.email,
    u.profile_image,
    u.password
    FROM users as u
    `
  );
  return data;
};

const userIdMatchPosts = async () => {
  const data = await myDataSource.query(
    `SELECT
        p.user_id as postingId,
        p.posting_image_url as postingImageUrl,
        p.content as postingContent
        FROM posts as p
        `
  );
  return data;
};

module.exports = { createUser, userIdMatchPosts, getUser };
