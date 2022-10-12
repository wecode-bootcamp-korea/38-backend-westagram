const { DataSource } = require("typeorm");

const westa_DB = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

westa_DB
  .initialize()
  .then(() => {
      console.log("Data Source has been initialized!");
    })
  .catch((err) => {
      console.error("Error occurred during Data Source initialization", err);
      westa_DB.destroy();
    });
    
const clickLike=async(userId, postId)=>{

    try{
        return await westa_DB.query(`
        INSERT INTO likes (
          user_id, 
          post_id
        ) VALUES (?, ?);`,
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