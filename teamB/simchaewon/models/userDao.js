
const createUser = async(name, email, password, profileImage) => {
  
  
  try {
    await westa_DB.query(
      `INSERT INTO users(
				name,
				email,
				password,
				profile_image
  		) VALUES (?, ?, ?, ?);
				`,
      [name, email, password, profileImage]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const getUserPosts = async (userName) => {
  
  linkingDB.linkDB();

  try {
    const userId = await westa_DB.query(`SELECT id FROM users WHERE name=?;`, [
      userName,
    ]);
    const userID = await userId[0].id;
    const user_posts = await westa_DB.query(`
      SELECT users.id AS userId, 
        users.profile_image AS userProfileImage, 
        posts.id AS postingId, 
        posts.post_image AS postingImageUrl, 
        posts.content 
      FROM users 
      LEFT JOIN posts 
      ON users.id=posts.user_id 
      WHERE users.id=${userID} 
      ORDER BY posts.id;`
    );
    const postingArr = [];

    await user_posts.forEach((el) => {
      postingArr.push({
        postingId: el.postingId,
        postingImageUrl: el.postingImageUrl,
        postingContent: el.content,
      });
    });

    const result = await {
      userId: user_posts[0].userId,
      userProfileImage: user_posts[0].userProfileImage,
      postings: postingArr,
    };

    // await console.log(result);

    return await result;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createUser,
  getUserPosts,
};
