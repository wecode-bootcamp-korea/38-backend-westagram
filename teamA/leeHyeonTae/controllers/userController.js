const userService = require('../services/userService');

const signUp = async (req, res) => {
    try{
        const { name, email, profile_image, password } = req.body;

        if( !name || !email || !profile_image || !password ){
            return res.status(400).json({ message : 'error! key_error of userController'});
        }

        await userService.signUp( name, email, profile_image, password);

        res.status(201).json({ message: 'user signup complete! '});
    }
    catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message});
    }
};

module.exports = {
    signUp
}