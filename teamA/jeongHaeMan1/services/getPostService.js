const getPostDao = require('../models/getPostDao')

const search = async () => {
    const createGetPost = await getPostDao.createGetPost();

    return createGetPost;
};

module.exports = {
    search
}