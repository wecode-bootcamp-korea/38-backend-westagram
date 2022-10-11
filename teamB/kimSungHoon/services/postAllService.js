const postAllDao = require('../models/postAllDao');

const readingPost = async () => {
    const result = await postAllDao.readingPost();
    return result;
 };


module.exports = {
    readingPost
}