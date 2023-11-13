const User = require('../models/User')
const Otp = require('../models/Otp')
const otpGenerator = require('otp-generator')
//variable name as "otp-generator" will give error
const Profile = require('../models/Profile')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config()
const mailSender = require('../utils/mailSender')

//Error codes:
//401-Unauthorized
//200: OK
//500: internal server error
//403: forbidden 
//400:bad request


//sendOtp
exports.sendOtp = async (req, res)=>{
    try{
        const {email} = req.body;

        const checkUserPresent = await User.findOne({email});

        
        //js treats null as false
        if(checkUserPresent){
            //return not required
            res.status(401).json({
                success: false,
                message: "User already exists"
            })
        }
        //further validation can be done for email

        //better package can be used to generate unique otp
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets: false,
            specialChars:false
        })
        console.log("OTP", otp)

        //otp should be unique
        //confusion: since otp will expire, how can we get a unique otp
        let result = await Otp.findOne({otp})

        while(result){
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets:false,
                lowerCaseAlphabets: false,
                specialChars:false
            })
            result = await Otp.findOne({otp})
        }

        //doubt related to objects -> cleared
        const otpPayload = {email, otp}
        const otpBody = await Otp.create(otpPayload)
        console.log("otpBody: ", otpBody)

        
        res.status(200).json({
            success:true,
            message:"OTP generated successfully",
            otp
        })

    
    }catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message:e.message,
        })
    }
    

}

//signUp
//We have to separately login after signing up
exports.signUp = async (req, res)=>{
    try{
        //model doesn't have all of these below
        const {firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp} = req.body

        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
           
            res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }
        
        if(password !== confirmPassword){
            res.status(400).json({
                success:false,
                message:"Passwords do not match. Please try again"
            })
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            
            res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }

        //finding most recent otp is again confusing (written in sendOtp controller)
        //.sort() -> For sorting the document in descending order on the basis of createdAt
        //.limit() -> For displaying the limited number of document present in the collection
        const recentOtp = await User.find({email}).sort({createdAt:-1}).limit(1)
        console.log("Recent OTP:", recentOtp)
        if(recentOtp.length === 0){
            
            res.status(400).json({
                success:false,
                message:"OTP not found"
            })
        }else if(otp !== recentOtp.otp){
            
            res.status(400).json({
                success:false,
                message:"OTP doesn't match"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const profileDetails = await Profile.create({
            gender: null, dateOfBirth: null, about: null, contactNumber: null
        })

        const user = await User.create({
            firstName, lastName, email, contactNumber, password:hashedPassword, accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        
        res.status(200).json({
            success:true,
            message:"User registered successfully",
            user
        })

    }catch(e){
        console.log(e)

        res.status(500).json({
            success:false,
            message:"User can't be registered",
        })
    }
}
//login
exports.login = async (req, res) => {
    try{
        const {email, password} = req.body

        if(!email || !password){

            res.status(403).json({
                success: false,
                message: "Enter all the details"
            })
        }
        //no need of populate below
        const user = await User.findOne({email})
        if(!user){
            res.status(401).json({
                success:false,
                message:"User isn't registered. Please signup first"
            })
        }

        if(await bcrypt.compare(password, user.password)){
            const payload = {email:user.email, id: user._id, accountType: user.accountType}
            const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {expiresIn:'2h'})

            //we got stuck in the two lines below in the past
            user.token = token
            user.password = undefined

            const options = {expires: new Date(Date.now() + 3*24*60*60*1000), httpOnly: true}
            //An HttpOnly Cookie is a tag added to a browser cookie that prevents client-side scripts from accessing data
            res.cookie('token', token, options).status(200).json({
                success:true,
                token,
                user,
                message: "Logged in successfully"
            })
        }else{
            res.status(401).json({
                success:false,
                message:"Password is incorrect"
            })
        }
    }catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message:"Error logging in",
        })
    }
}

//changePassword -> hw
//doubt: bcrypt generates different outputs for same input -> cleared (no need to think of this)
//doubt: can object returned by mongoose function be used to make changes in the db? Ans -> no, it returns a copy
exports.changePassword = async (req, res) => {
    try{
        //get data of oldPassword, newPassword, confirmNewPassword from req body
        const {oldPassword, newPassword, confirmNewPassword} = req.body
        //validation -> I think old password should be validated as well -> done below
        if(newPassword !== confirmNewPassword){
            res.json({
                success:false,
                message:`Passwords don't match`
            })
        }
        const id = req.user.id
        const {password} = await User.findById({_id:id})
        //update in db -> how to find the user? -> found
        if(await bcrypt.compare(oldPassword, password)){
            const hashedPassword = await bcrypt.hash(newPassword, 10)
            await User.findOneAndUpdate({_id:id},{password: hashedPassword})
        }
        
        //send mail
        mailSender(req.user.email, 'Password Changed', 'Your password has been changed successfully')

        //return response
        res.status(200).json({
            success:true,
            message:"Password changed successfully"
        })
    }catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message:"Error changing password",
        })
    }
}