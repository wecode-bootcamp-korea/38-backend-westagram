const myDataSource = require('./DataSource');

const createLike = async ( user_id, post_id ) => {
     return await myDataSource.query(
          `INSERT INTO likes(
               user_id,
               post_id
           )values(?, ?)
       `,[ user_id, post_id]);
};


module.exports = {
  createLike
}