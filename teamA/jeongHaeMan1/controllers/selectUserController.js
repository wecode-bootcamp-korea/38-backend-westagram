const selectUserService = require('../services/selectUserService');

const select = async (req, res) => {
    try {
        const userId = req.params.id;
        const select = await selectUserService.select(userId);

        return res.status(201).json({ data : select });
    } catch (err) {
        console.error(err);
        return res.status(err.statusCode || 500).json({ message : err.message});
    }
};

module.exports = {
    select
}
