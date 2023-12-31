const Profile = require('../models/Profile')
//will user schema be required? -> yes, for fetching profile id
const User = require('../models/User')
const Course = require('../models/Course')
const {uploadImageToCloudinary} = require('../utils/imageUploader')
require('dotenv').config()

exports.updateProfile = async (req, res)=>{
    try{

        //similar to default parameter
        // const {dateOfBirth="", about="", contactNumber, gender, firstName, lastName} = req.body

        const {dateOfBirth, about, contactNumber, gender, firstName, lastName, image} = req.body
        const id = req.user.id

        //no need of validating id ig -> removed from the condition below
        //
        if(!contactNumber || !gender || !dateOfBirth || !about || !firstName || !lastName){
            return res.status(400).json({
                success:false,
                message:"All fields are mandatory"
            })
        }

        let userDetails = await User.findById(id).populate('additionalDetails').exec()
        const profileId = userDetails.additionalDetails
        const profileDetails = await Profile.findById(profileId)
        
        //another way of updating data in db
        //doubt: will this method return updated details in response?
        profileDetails.dateOfBirth = dateOfBirth
        profileDetails.about = about
        profileDetails.contactNumber = contactNumber
        profileDetails.gender = gender
        await profileDetails.save()
        


        userDetails.firstName = firstName
        userDetails.lastName = lastName
        userDetails.image = image
        await userDetails.save()
        userDetails = await User.findById(id).populate('additionalDetails').exec()

        //confidential info should be hidden generally
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            profileDetails,
            userDetails
        })

    }catch(e){
        console.log(e.message)
        return res.status(500).json({
            success:false,
            error:e.message,
            message:"Error updating the profile",
        })
    }
}

exports.deleteAccount = async (req, res) =>{
    try{

        const id = req.user.id

        const userDetails =  await User.findById(id)

        //validation not required ig
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        await Profile.findByIdAndDelete(userDetails.additionalDetails)

        //hw: update students enrolled -> done -> sol not there
        //below line will give undefined if empty
        let i = 0
        while(i < userDetails.courses.length){
            let courseId = userDetails.courses[i]
            await Course.findByIdAndUpdate(courseId, {$pull:{studentsEnrolled: id}})
            i++
        }

        await User.findByIdAndDelete(id)

        return res.status(200).json({
            success:true,
            message:"User deleted successfully"
        })



    }catch(e){
        return res.status(500).json({
            success:false,
            error:e.message,
            message:"Error deleting the account",
            

        })
    }
}

exports.getAllUserDetails = async (req, res)=>{
    try{    
        const id = req.user.id
        //validation is not required ig because user is already authorised
        const userDetails = await User.findById(id).populate("additionalDetails").exec()

        return res.status(200).json({
            success:true,
            message:"User details fetched successfully",
            userDetails
        })

    }catch(e){
        return res.status(500).json({
            success:false,
            error:e.message,
            message:"Error fetching the user details",
            

        })
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try{

        //I think we insert in the object below
        const displayPicture = req.files.displayPicture
        
        const userId = req.user.id

        //what is this?
        const image = await uploadImageToCloudinary(displayPicture, process.env.FOLDER_NAME, 1000, 1000)

        //printing what? -> will get to know while testing -> Is is related to the return in imageUploader?
        console.log(image)

        const updatedProfile = await User.findByIdAndUpdate(userId, {image: image.secure_url}, {new:true})

        //res.send is there in class code
        //Is more validation required? eg: Is updatedProfile null?
        return res.status(200).json({
            success:true,
            message:"Display picture updated successfully",
            data: updatedProfile
        })

    }catch(e){
        return res.status(500).json({
            success:false,
            error:e.message,
            message:"Error updating display picture",
        })
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try{


        const userId = req.user.id
        const userDetails = await User.findById(userId).populate({
            path:"courses",
            populate:{
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }
        }).exec()
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message: 'user not found'
            })
        }
        return res.status(200).json({
            success:true,
            //Check how we just return the courses
            data: userDetails.courses
        })


    }catch(e){
        return res.status(500).json({
            success:false,
            error:e.message,
            message:"Error fetching enrolled courses",
        })
    }
}