const { DataSource } = require("typeorm");

const westa_DB = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

westa_DB.initialize()

  .then(() => {
    console.log("Data Source has been initialized!");
  })

  .catch((err) => {
    console.error("Error occurred during Data Source initialization", err);
    westa_DB.destroy();
  });

const createPost = async (title, content, userName, postImage) => {
  try {
    const id = await westa_DB.query(`
      SELECT id 
      FROM users 
      WHERE users.name=? ;`,
      [userName]
    );
    return await westa_DB.query(`
      INSERT INTO posts (
        title, 
        content, 
        user_id, 
        post_image
    ) VALUES (?,?,?,?)`,
      [title, content, id[0].id, postImage]
    );

  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const getPosts = async () => {
  try {
    return await westa_DB.query(`SELECT * FROM posts`);
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const updatePost = async (postId, contentChange) => {
  try {
    await westa_DB.query(`
      UPDATE posts 
      SET content=? 
      WHERE id=?`, 
          [contentChange, postId,]
          );

    return await westa_DB.query(`
      SELECT users.id AS userId, 
        users.name as userName, 
        posts.id as postingId, 
        posts.title as postingTitle, 
        posts.content AS postingContent 
      FROM users,posts 
      WHERE users.id=posts.user_id AND posts.id=?`,
        [postId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const deletingPost = async(postId)=>{
  await westa_DB.query(`
    DELETE 
    FROM posts 
    WHERE id=?`,
    [postId])
}
// DELETE FROM table_name WHERE condition;
module.exports = { createPost, getPosts, updatePost, deletingPost };