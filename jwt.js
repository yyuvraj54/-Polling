const jwt  = require("jsonwebtoken")

const jwtAuthMiddleware = (req,res,next)=>{

    // First check request header has the authorization or not
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error:"Token not found"})

    // Extract the jwt token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({error:'Unauthorized'})
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    }
    catch(err){
        console.log(err)
        res.status(401).json({error:'Invalid token'})
    }
}

const genrateToken = (userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET, {expiresIn:3000});
}
module.exports = {jwtAuthMiddleware,genrateToken}