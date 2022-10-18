const myDataSource = require('./DataSource');

const createPost = async ( title, content, user_id ) => {
     return await myDataSource.query(
     `INSERT INTO posts(
          title,
          content,
          user_id     
     ) VALUES (?, ?, ?);
     `,
     [ title, content, user_id ]);
};

const viewPost = async () => {
     return await myDataSource.query(
          `SELECT 
               users.id AS userId,
               users.profile_image AS userProfileImage,
               posts.id AS postingId,
               posts.title AS postTitle,
               posts.content AS postingContent
          FROM posts
          INNER JOIN users ON users.id=posts.user_id`
          );
}

const viewUserPost = async (userID) => {
     let postD = await myDataSource.query(
          `SELECT
              posts.id AS postingID,
              posts.title AS postingTitle,
              posts.content AS postingContent
          FROM posts
          WHERE posts.user_id=${userID}`);
          
      let userD = await myDataSource.query(
          `SELECT
              users.id AS userID,
              users.profile_image AS userProfileImage
          FROM users
          WHERE users.id=${userID}`);
      
      userD[0].postings= postD;
      return userD[0];

}

const updatePost = async (postID, content) => {
     await myDataSource.query(
          `UPDATE posts
              SET
                  posts.content =?
          WHERE posts.id=${postID}
          `,[content]);
  
      let updatedPosts = await myDataSource.query(
          `SELECT 
              users.id AS userId,
              users.name AS userName,
              posts.id AS postingId,
              posts.title AS postTitle,
              posts.content AS postingContent
          FROM posts
          INNER JOIN users ON users.id=posts.user_id
          WHERE posts.id=${postID}`);
  
      return updatedPosts[0];
}

const deleting = async (postID) => {
     await myDataSource.query(
          `DELETE FROM posts
          WHERE posts.id=${postID}`);
}

module.exports = {
  createPost,
  viewPost,
  viewUserPost,
  updatePost,
  deleting
}