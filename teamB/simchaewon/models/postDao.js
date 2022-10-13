const westa_DB=require("../utils/typeorm");

const createPost = async (title, content, userId, postImage) => {
  try {
    return await westa_DB.query(`
      INSERT INTO posts (
        title, 
        content, 
        user_id, 
        post_image
    ) VALUES (?,?,?,?)`,
      [title, content, userId, postImage]
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
          [contentChange, postId]
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
    [postId]
  )
}

module.exports = { createPost, getPosts, updatePost, deletingPost };
