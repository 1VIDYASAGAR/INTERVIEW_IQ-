const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model")

async function authUser(req,res,next){
     console.log("Cookies =>", req.cookies);
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized access"})
    }
    const isTokenBlacklisted = await tokenBlacklistModel.findOne({token})
    if(isTokenBlacklisted){
        return res.status(401).json({message:"Token is invalid or expired"})
    }

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ Decoded Token:", decoded);

    req.user = decoded;
    next();

} catch (err) {

    console.log("❌ JWT ERROR:", err);

    return res.status(401).json({
        message: "Unauthorized access"
    });
}
}

module.exports = {authUser};