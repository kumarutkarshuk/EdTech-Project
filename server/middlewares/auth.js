const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config()


//auth
exports.auth = async(req, res, next) => {
    try{
        const token = req.cookie.token || req.body.token || req.header("Authorization").replace("Bearer ", "")

        if(!token){
            res.status(401).json({
                success:false,
                message:"Token is missing"
            })
        }
         try{
            const decode =  jsonwebtoken.verify(token, process.env.JWT_SECRET)
            console.log("Decoded token:", decode)
            req.user = decode

         }catch(e){
            res.status(401).json({
                success:false,
                message:"Token in invalid"
            })
         }
         next()
        
    }catch(e){
        res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token"
        })
    }


}

//isStudent
exports.isStudent = async (req, res, next)=>{
    try{
        if(req.user.accountType !== 'Student'){
            res.status(401).json({
                success:false,
                message:"This is a protected route for students only"
            })
        }
    }catch(e){
        res.status(500).json({
            success:false,
            message:"User role can't be verified"
        })
    }
    next()
    
}
//isInstructor -> same as isStudent
exports.isInstructor = async (req, res, next)=>{
    try{
        if(req.user.accountType !== 'Instructor'){
            res.status(401).json({
                success:false,
                message:"This is a protected route for instructors only"
            })
        }
    }catch(e){
        res.status(500).json({
            success:false,
            message:"User role can't be verified"
        })
    }
    next()
}
//isAdmin -> same as isStudent
exports.isAdmin = async (req, res, next)=>{
    try{
        if(req.user.accountType !== 'Student'){
            res.status(401).json({
                success:false,
                message:"This is a protected route for admins only"
            })
        }
    }catch(e){
        res.status(500).json({
            success:false,
            message:"User role can't be verified"
        })
    }
    next()
}