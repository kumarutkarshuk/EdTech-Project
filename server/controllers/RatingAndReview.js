const RatingAndReview = require('../models/RatingAndReviews')
const Course = require('../models/Course')
const mongoose = require('mongoose')

exports.createRating = async (req, res) => {
    try{

        const userId = req.user.id
        //order of destructuring doesn't matter
        const {rating, review, courseId} = req.body

        //another method discussed in class
        const courseDetails = await Course.findById(courseId)
        if(!courseDetails.studentsEnrolled.includes(userId)){
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in the course"
            })
        }

        const alreadyReviewed = await RatingAndReview.findOne({user:userId, course:courseId})

        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"Student has already reviewed"
            })
        }

        const ratingReview = RatingAndReview.create({rating, review, course:courseId, user: userId})

        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId, {$push: {ratingAndReviews: ratingReview._id}}, {new:true})

        console.log("Updated course details",updatedCourseDetails)

        return res.status(200).json({
            success:true,
            message:"Rating and review created successfully",
            ratingReview
        })


    }catch(e){
        console.log(e)
        return res.status(500).json({
            success:false,
            message:"Error creating rating & review"
        })
    }
}

exports.getAverageRating = async (req, res) => {
    try{

        const courseId = req.body.courseId

        //new concepts
        //aggregate function performs some steps
        const result = await RatingAndReview.aggregate([
            {   
                //find all entries with the course id
                $match: {course: new mongoose.Types.ObjectId(courseId)}
            },
            {   
                //group all the entries and find average
                $group:{_id:null, averageRating: {$avg: "$rating"}}
            }
        ])

        //aggregate function returns array
        //return the average rating like this
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating
            })
        }else{
            //what if all rating are given 0?
            return res.status(200).json({
                success:true,
                message:"No rating found",
                averageRating: 0
            })
        }


    }catch(e){
        console.log(e)
        return res.status(500).json({
            success:false,
            message:"Error fetching average rating",
            error: e.message
        })
    }
}

exports.getAllRatingAndReviews = async (req, res) => {
    try{

        //sort also -> go by eng meaning of what is written
        //populate and get only selected data
        const allData = await RatingAndReview.find().sort({rating: "desc"})
        .populate({path:"user",select: "firstName lastName email image"})
        .populate({
            path:"course", select:"courseName"
        }).exec()

        if(allData.length === 0){
            return res.status(200).json({
                success:true,
                message:"No rating or review found",
                
            })
        }
        return res.status(200).json({
            success:true,
            message:"All ratings and reviews fetched successfully",
            data: allData
        })

    }catch(e){
        console.log(e)
        return res.status(500).json({
            success:false,
            message:"Error fetching all ratings and reviews"
        })
    }
}