const searchPostDao = require('../models/searchPostDao');

const search = async () => {
    const searchPost = await searchPostDao.searchPost();

    return searchPost;
}

module.exports = { search }