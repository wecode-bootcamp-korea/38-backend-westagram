const userService = require('../services/userService');

const signUp = async (req, res) => {
     const { name, email, profile_image, password } = req.body;

     await userService.signUp( name, email, password, profile_image );
     
     return res.status(201).json({ message : "SIGNUP_SUCCESS"});
}

module.exports = { signUp };