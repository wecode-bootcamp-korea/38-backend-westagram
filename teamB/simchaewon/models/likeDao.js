const westa_DB=require("../utils/typeorm");
    
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