const likeDao=require("../models/likeDao");

const click =async (userId, postId) => {
    await likeDao.clickLike(
        userId, 
        postId
    )
}

module.exports={
    click
}