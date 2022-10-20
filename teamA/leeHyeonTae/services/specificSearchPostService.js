const specificSearchPostDao = require('../models/specificSearchPostDao');



const resultSpecific = async (a) => {
    try{

    const resultObject = await specificSearchPostDao.specificSearchPost(a);

    return resultObject;
}
catch (err){
    console.log(err);
    const error = new Error('invalid data input');
    error.statusCode = 500;
    throw error;
}
}

module.exports = {resultSpecific }