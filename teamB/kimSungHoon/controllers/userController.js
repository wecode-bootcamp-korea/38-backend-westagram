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
        const id = req.params.id;
        const result = await userService.userPosting(id);
        return res.status(201).json({ data: result });
    }
    catch(err){
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
}

const like = async (req, res) => {
    try {
        const {user_id, post_id} = req.body;

        if( !user_id || !post_id ){   
            return res.status(400).json({message: '키 에러 발생'});
        }

        const result = await userService.like(user_id, post_id);
        return res.status(201).json({ "message" : "likeCreated" });
    }
    catch(err){
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
}

module.exports = {
	signUp,
    userPosting,
    like
}