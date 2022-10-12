const userService = require('../services/userService');

const signUp = async (req, res) => {
    try {
        const { name, email, password, profileImage } = req.body;

        if ( !name || !email || !password || !profileImage ) {
            return res.status(400).json({ meassgae : 'KEY_ERROR' });
        }

        await userService.signUp(name, email, password, profileImage);

        return res.status(201).json({ message : 'SIGNUP_SUCCESS' });

    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message : err.meassgae});
    }
};

const select = async (req, res) => {
    try {
        const userId = req.params.id;
        const select = await userService.select(userId);

        return res.status(201).json({ data : select });
    } catch (err) {
        console.error(err);
        return res.status(err.statusCode || 500).json({ message : err.message});
    }
};


module.exports = {
    signUp, select
}
