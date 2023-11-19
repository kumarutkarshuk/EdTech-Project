const Profile = require('../models/Profile')
//will user schema be required? -> yes, for fetching profile id
const User = require('../models/User')
const Course = require('../models/Course')

exports.updateProfile = async (req, res)=>{
    try{

        //similar to default parameter
        const {dateOfBirth="", about="", contactNumber, gender} = req.body
        const id = req.user.id

        //no need of validating id ig
        if(!contactNumber || !gender || !id){
            res.status(400).json({
                success:false,
                message:"All fields are mandatory"
            })
        }

        const userDetails = await User.findById(id)
        const profileId = userDetails.additionalDetails
        const profileDetails = await Profile.findById(profileId)
        
        //another way of updating data in db
        //doubt: will this method return updated details in response?
        profileDetails.dateOfBirth = dateOfBirth
        profileDetails.about = about
        profileDetails.contactNumber = contactNumber
        profileDetails.gender = gender
        await profileDetails.save()

        //confidential info should be hidden generally
        res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            profileDetails
        })

    }catch(e){
        res.status(500).json({
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
            res.status(404).json({
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

        res.status(200).json({
            success:true,
            message:"User deleted successfully"
        })



    }catch(e){
        res.status(500).json({
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

        res.status(200).json({
            success:true,
            message:"User details fetched successfully",
            userDetails
        })

    }catch(e){
        res.status(500).json({
            success:false,
            error:e.message,
            message:"Error fetching the user details",
            

        })
    }
}