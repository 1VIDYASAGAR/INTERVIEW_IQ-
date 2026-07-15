const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model")

/**
 * @name registerUserController
 * @description register a new user,expects username,email and password
 * @access Public
 */
async function  registerUserController(req,res){
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        return res.status(400).json({message:"All fields are required"})
    }
    const isUserAlreadyExist = await userModel.findOne({
        $or: [{username}, {email}]
    })
    if(isUserAlreadyExist){
        return res.status(400).json({message:"User already exists"})
    }

    const hash = await bcrypt.hash(password,10);
    const user = await userModel.create({
        username,
        email,
        password:hash   
    })
    const token = jwt.sign(
        {id: user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie ("token",token)

    res.status(201).json({
        message:"User registered successfully",
        user:{  
            id:user._id,
            username:user.username,
            email:user.email
        }
    });
    

}

/**
 * @name loginUserController
 * @description login a user,expects email and password
 * @access Public
 */
async function loginUserController(req,res){
    const {email,password} = req.body;
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).json({message:"User not found or invalid email or password"})
    }

    const  isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
         return res.status(400).json({message:"User not found or invalid email or password"})
    }
    const token = jwt.sign(
        {id: user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token);
    res.status(200).json({
        message:"User loggenIn successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }

    })

}

/**
 * @name logoutUserController
 * @description logout a user,clear the cookie and add the token in blacklist
 * @access Public   
 */
async function logoutUserController(req,res){
    const token = req.cookies.token;

    if(token){
        await tokenBlacklistModel.create({token})
}
res.clearCookie("token");
res.status(200).json({message:"User logged out successfully"});
}

/**
 * @name getMeController
 * @description get the current logged in user details
 * @access Private  
 */
async function getMeController(req,res){
    const user = await userModel.findById(req.user.id).select("-password");
    res.status(200).json({
        message:"User details fetched successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

module.exports ={registerUserController,loginUserController,logoutUserController,getMeController}