const Course = require('../models/Course')
const Tag = require('../models/Tag')
const User = require('../models/User')
const {uploadImageToCloudinary} = require('../utils/imageUploader')
require('dotenv').config()

exports.createCourse = async (req, res)=>{
    try{
        const {courseName, courseDescription, whatYouWillLearn, price, tag} = req.body
        const thumbnail = req.files.thumbnailImage

        
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag){
            res.status(400).json({
                success:false,
                message:"All fields are mandatory"
            })
        }

        const userId = req.user.id
        const instructorDetails = await User.findById(userId)
        console.log("Instructor Details:", instructorDetails)
        //if not present, null will be returned (I think)
        if(!instructorDetails){
            res.status(404).json({
                success:false,
                message:'Instructor Not Found'
            })
        }
        //check whether userId and instructorDetails._id are the same or not in the next classes

        //validating tag because of postman since dropdown will always give valid tag
        const tagDetails = await Tag.findById(tag)
        if(!tagDetails){
            res.status(404).json({
                success:false,
                message:'Tag Not Found'
            })
        }

        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)
        
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            tag: tagDetails._id,
            thumbnail: thumbnailImage.secure_Url
        })

        await User.findByIdAndUpdate({_id: instructorDetails._id}, {
            $push:{courses:newCourse._id}
        },{new:true})


        //HW -> update tag schema -> done
        await Tag.findByIdAndUpdate({tag}, {$push: {course:tag}}, {new:true})

        res.status(200).json({
            success:true,
            message:"Course created successfully",
            data:newCourse
        })

        
    }catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message:"Failed to create course",
            error:e.message
        })
    }
}

exports.showAllCourses = async (req, res)=>{
    try{
        //will look into the below statement in the future
        const allCourses = await Course.find({}).populate('instructor').exec()

        res.status(200).json({
            success:true,
            message:"Courses fetched successfully",
            data:allCourses 
        })
    }catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message:"Error fetching courses"
        })
    }
}