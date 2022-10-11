const selectUserDao = require('../models/selectUserDao');

const select = async (userId) => {
    const createSelectUser = await selectUserDao.createSelectUser(userId);

    return createSelectUser;

}

module.exports = {
    select
}