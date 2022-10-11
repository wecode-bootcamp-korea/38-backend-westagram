const getPostService = require('../services/getPostService');

const search = async (req, res, next) => {
    try {
        const search = await getPostService.search();

        return res.status(201).json({ data : search });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message : err.meassgae});
    }
};

module.exports = {
    search
}
