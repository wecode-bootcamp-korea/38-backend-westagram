const appDataSource = require('../utils/typeorm');


const deletePost = async (deleteId) => {
    try{
    await appDataSource.query(
        `DELETE
                FROM posts
            WHERE id=${deleteId};`
            );
    }
    catch{
        console.log("Dao");
    }
};

module.exports = { deletePost }