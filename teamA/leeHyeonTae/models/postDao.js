const appDataSource = require('../utils/typeorm');


    const createPost = async ( title, content, url_image, user_id) => {
        try{
            const a = await appDataSource.query(
                `INSERT INTO posts(title, content, url_image, user_id) VALUES(?, ?, ?, ?)`,
                [title, content, url_image, user_id]
            );

            return a;
        }
        catch (err){
            console.log(err);
            const error = new Error('invalid data input3443 ddd');
            err.statusCode = 500;
            throw error;
        }
    }

    module.exports = {
        createPost
    }