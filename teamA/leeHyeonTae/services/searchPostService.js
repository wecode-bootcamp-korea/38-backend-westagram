const searchPostDao = require('../models/searchPostDao');

const search = async () => {
    try{
    const searchPost = await searchPostDao.searchPost();

    return searchPost;
}
catch (err){
    console.log(err);
    const error = new Error('invalid data input');
    error.statusCode = 500;
    throw error;
}
}


module.exports = { search }