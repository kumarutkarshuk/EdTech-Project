const Course = require('../models/Course')
const Category = require('../models/Category')
const User = require('../models/User')
const {uploadImageToCloudinary} = require('../utils/imageUploader')
require('dotenv').config()

exports.createCourse = async (req, res)=>{
    try{
        const {courseName, courseDescription, whatYouWillLearn, price, category} = req.body
        const thumbnail = req.files.thumbnailImage

        
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category){
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

        //validating category because of postman since dropdown will always give valid category
        const categoryDetails = await Category.findById(category)
        if(!categoryDetails){
            res.status(404).json({
                success:false,
                message:'Category Not Found'
            })
        }

        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)
        
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_Url
        })

        await User.findByIdAndUpdate({_id: instructorDetails._id}, {
            $push:{courses:newCourse._id}
        },{new:true})


        //HW -> update category schema -> done
        await Category.findByIdAndUpdate(category, {$push: {course:newCourse._id}}, {new:true})

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

exports.getCourseDetails = async (req, res)=>{
    try{

        const {courseId} = req.body

        //way to use .find()
        //.populate() is used multiple times
        //stackoverflow -> dive more in populating -> to do that repeat the code like done below
        const courseDetails = await Course.find({_id: courseId})
                                            .populate({
                                                path:"instructor",
                                                populate:{
                                                    path:"additionalDetails"                                                 
                                                    
                                                }
                                            })
                                            .populate({
                                                path:"instructor",
                                                populate:{
                                                    path:"courses"                                                 
                                                    
                                                }
                                            })
                                            .populate("category")
                                            .populate("ratingAndReviews")
                                            .populate({
                                                path:"courseContent",
                                                populate:{
                                                    path:"subSection"
                                                }
                                            })
                                            .exec()
                                            
        if(!courseDetails){
            res.status(400).json({
                success:false,
                message:`Couldn't find the course with course id: ${courseId}`
            })
        }

        res.status(200).json({
            success:true,
            message:"Course details fetched successfully",
            data: courseDetails
        })

    }catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message:"Error getting course details"
        })
    }
}