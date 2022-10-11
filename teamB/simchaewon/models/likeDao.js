const { DataSource } = require("typeorm");

const westa_DB = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  password: process.env.TYPEORM_PASSWORD,
  port: process.env.TYPEORM_PORT,
  database: process.env.TYPEORM_DATABASE,
  username: process.env.TYPEORM_USERNAME,
});

westa_DB.initialize()

  .then(() => {
    console.log("DATA SOURCE HAS BEEN INITIALIZED!");
  })
  .catch((err) => {
    console.error("Error ocurred during Data Source initialization", err);
    westa_DB.destroy();
  });

  const clickLike=async(userId, postId)=>{
    try{
        return await westa_DB.query(`INSERT INTO likes (user_id, post_id) VALUES (?, ?);`,
        [userId, postId]
        );
    }

    catch (err) {
        const error = new Error ("INVALID_DATA_INPUT");
        error.statusCode=500;
        throw error;
    }
  }

  module.exports = {clickLike};