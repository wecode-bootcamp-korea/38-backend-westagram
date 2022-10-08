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

const createPost = async (title, content, userId, postingImageUrl) => {
  await myDataSource.query(
    `INSERT INTO posts (
            title,
            content,
            user_id,
            posting_image_url
        ) VALUES (
            ?,
            ?,
            ?,
            ?
        )`,
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
        FROM users as u, posts as p
        `
  );
  return data;
};

module.exports = { createPost, allPosts };
