//status codes are necessary for the frontend


const User = require('../models/User')
const mailSender = require('../utils/mailSender')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
//resetPasswordToken
exports.resetPasswordToken = async (req, res)=>{
    try{
        const {email} = req.body

        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User isn't registered with us"
            })
        }
        const token = crypto.randomBytes(20).toString('hex')


        
        const updatedDetails = await User.findOneAndUpdate({email}, {
            token:token, resetPasswordExpires:Date.now() + 5*60*1000
        }, {new:true})

        //127.0.0.1
        //frontend url should be unique
        const url = `http://localhost:3000/update-password/${token}`
        mailSender(email, 'Reset Password Link', `Click on the link to change your password: ${url}`)

        return res.json({
            success:true,
            message:'Email sent successfully. Please check your email to change password.'
        })
    }catch(e){
        return res.status(500).json({
            success:false,
            message:'Something went wrong while sending email for resetting password'
        })
    }
}

//resetPassword
exports.resetPassword = async (req, res) => {
    try{
        //token in req body will be inserted by the frontend
        const {password, confirmPassword, token} = req.body

        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Passwords don't match"
            })
        }

        const userDetails = await User.findOne({token})
        
        if(!userDetails){
            return res.json({
                success:false,
                message:"No user found with this token"
            })
        }

        //milliseconds are being compared
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(403).json({
                success:false,
                message:'Token has expired. Please go back to login and retry'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await User.findOneAndUpdate({token}, {password: hashedPassword}, {new:true})

        return res.status(200).json({
            success:true,
            message:'Password reset successful'
        })
        
    }catch(e){
        console.log(e)
        return res.status(500).json({
            success:false,
            message:'Something went wrong while resetting password',
        })
    }
}