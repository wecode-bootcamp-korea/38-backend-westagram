const specificSearchPostDao = require('../models/specificSearchPostDao');



const resultSpecific = async (a) => {
    

    const resultObject = await specificSearchPostDao.specificSearchPost(a);

    return resultObject;
}

module.exports = {resultSpecific }