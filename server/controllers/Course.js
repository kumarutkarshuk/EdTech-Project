const Course = require('../models/Course')
const Category = require('../models/Category')
const User = require('../models/User')
const {uploadImageToCloudinary} = require('../utils/imageUploader')
require('dotenv').config()
const ratingAndReviews = require('../models/RatingAndReviews')
const subSection = require('../models/SubSection')
const Section = require('../models/Section')

exports.createCourse = async (req, res)=>{
    try{
        const {courseName, courseDescription, whatYouWillLearn, price, category} = req.body
        const thumbnail = req.files.thumbnailImage

        
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category){
            return res.status(400).json({
                success:false,
                message:"All fields are mandatory"
            })
        }

        const userId = req.user.id
        const instructorDetails = await User.findById(userId)
        console.log("Instructor Details:", instructorDetails)
        //if not present, null will be returned (I think) -> yes
        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:'Instructor Not Found'
            })
        }
        //check whether userId and instructorDetails._id are the same or not -> in the next classes

        //validating category because of postman because dropdown will always give valid category
        const categoryDetails = await Category.findById(category)
        if(!categoryDetails){
            return res.status(404).json({
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


        //HW -> update category schema -> done -> not working 
        await Category.findByIdAndUpdate(category, {$push: {courses:newCourse._id}}, {new:true})

        return res.status(200).json({
            success:true,
            message:"Course created successfully",
            data:newCourse
        })

        
    }catch(e){
        console.log(e)
        return res.status(500).json({
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

        return res.status(200).json({
            success:true,
            message:"Courses fetched successfully",
            data:allCourses 
        })
    }catch(e){
        console.log(e)
        return res.status(500).json({
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
            return res.status(400).json({
                success:false,
                message:`Couldn't find the course with course id: ${courseId}`
            })
        }

        return res.status(200).json({
            success:true,
            message:"Course details fetched successfully",
            data: courseDetails
        })

    }catch(e){
        console.log(e)
        return res.status(500).json({
            success:false,
            message:"Error getting course details"
        })
    }
}

exports.editCourse = async (req, res) => {
    try{
        const {courseName, courseDescription, whatYouWillLearn, price, category, courseId} = req.body
        const thumbnail = req.files.thumbnailImage

        
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category){
            return res.status(400).json({
                success:false,
                message:"All fields are mandatory"
            })
        }

        const userId = req.user.id
        const instructorDetails = await User.findById(userId)
        console.log("Instructor Details:", instructorDetails)
        //if not present, null will be returned (I think) -> yes
        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:'Instructor Not Found'
            })
        }
        //check whether userId and instructorDetails._id are the same or not -> in the next classes

        //validating category because of postman becauae dropdown will always give valid category
        const categoryDetails = await Category.findById(category)
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:'Category Not Found'
            })
        }

        //update on cloudinary also
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)
        
        const updatedCourse = await Course.findByIdAndUpdate(courseId, {
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_Url
        }, {new: true})

        return res.status(200).json({
            success:true,
            message:"Course created successfully",
            data:updatedCourse
        })

    }catch(e){
        console.log(e)
        return res.status(500).json({
            success:false,
            message:"Failed to edit course",
            error:e.message
        })
    }
}

exports.deleteCourse = async (req, res) => {
    try{

        const {courseId} = req.body

        const courseDetails = await Course.findById(courseId).populate('courseContent')
        await Category.findByIdAndUpdate(courseDetails.category, {$pull:{courses: courseId}}, {new: true})

        //update ratings and reviews -> done
        courseDetails.ratingAndReviews.forEach(async (id) => await ratingAndReviews.findByIdAndDelete(id))

        await User.findByIdAndUpdate(req.user.id, {$pull:{courses: courseId}}, {new: true})

        //delete corresponding sub sections
        courseDetails.courseContent.forEach((element) => element.subSection.forEach(async (id) =>
                                    await subSection.findByIdAndDelete(id)))      

        //delete corresponding sections -> a bit doubtful
        courseDetails.courseContent.forEach(async (element) => await Section.findByIdAndDelete(element._id))

        await Course.findByIdAndDelete(courseId)
        return res.status(200).json({
            success:true,
            message: "Course deleted successfully"
        })

    }catch(e){
        console.log(e)
        return res.status(500).json({
            success:false,
            message:"Failed to delete course",
            error:e.message
        })
    }
}