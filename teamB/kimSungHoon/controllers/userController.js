const userService = require('../services/userService');

const signUp = async (req, res) => {
    try {
        const { name, email, password, profile_image } = req.body;

        if( !name || !email || !password || !profile_image ){   
            return res.status(400).json({message: '키 에러 발생'});
        }

        await userService.signUp(name, email, password, profile_image);
        return res.status(201).json({message: '유저 회원 가입 성공'});
    }
    catch(err){
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

const userPosting = async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await userService.userPosting(userId);
        return res.status(200).json({ data: result });
    }
    catch(err){
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
}

module.exports = {
	signUp,
	userPosting
}
