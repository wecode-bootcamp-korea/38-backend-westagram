const userService = require("../services/userService");

const signUp = async (req, res) => {

  try {
    const { name, email, password, profileImage } = req.body;

    if (!name || !email || !password || !profileImage) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await userService.signUp(name, email, password, profileImage);

    return res.status(201).json({
      message: "SIGNUP_SUCCESS",
    });
  } 
  
  catch (err) {
      return res.status(err.statusCode || 500).json({ message: err.message });
  }
};


const readUserAllPosts = async (req, res) =>{
  try{  const {userName} =req.body;

    if(!userName) {
      return res.status(400).json({message:"INPUT_ERROR"});
    }

    const userPosts=await userService.readUserAllPosts(userName);

    return res.status(201).json({
      datas:userPosts
    });
  }

  catch(err){
    return res.status( err.statusCode||500).json({message:err.message});
  }
}

module.exports = { signUp, readUserAllPosts };
