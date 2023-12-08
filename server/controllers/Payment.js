const {instance} = require('../config/razorpay')
const Course = require('../models/Course')
const User = require('../models/User')
const mailSender = require('../utils/mailSender')
const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollmentEmail')
const mongoose = require('mongoose')

//capture the payment and initiate Razorpay order
exports.capturePayment = async (req, res) => {
        const {course_id} = req.body
        const userId = req.user.id

        //not needed I think
        if(!course_id){
            return res.json({
                success:false,
                message: "Please provide valid course ID"
            })
        }
        
        //not needed I think
        //undefined initially
        let course
        try{
            course = await Course.findById(course_id)
            if(!course){
                return res.json({
                    success:false,
                    message: "Course not found"
                })
            }
            //convert string to object id
            const uid = new mongoose.Types.ObjectId(userId)
            //understand by the name
            if(course.studentsEnrolled.includes(uid)){
                //200?
                return res.status(200).json({
                    success:false,
                    message:"Student is already enrolled in the course"
                })
            }

        }catch(e){
            return res.status(500).json({
                success:false,
                message:"Error interacting with the DB",
    
            })
        }

        //create order

        const amount = course.price
        const currency = "INR"
        const options = {
            amount: amount*100,
            currency,
            //go by the name
            receipt: Math.random(Date,now()).toString(),
            notes:{
                courseId: course_id,
                userId
            }
        }

        //initiating the payment using Razorpay
        try{
            const paymentResponse = await instance.orders.create(options)
            console.log("Payment Response",paymentResponse)

            //we'll come to know why we sent this later
            return res.status(200).json({
                success:true,
                //can't write simply course.courseName
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount

            })
        }catch(e){
            return res.status(500).json({
                success:false,
                message:"Error initiating the payment",
    
            })
        }
   
}

//refer notes for what we're doing in this handler
exports.verifySignature = async (req, res) => {
    //present in the server
    const webhookSecret  = "12345678"
    
    //this is how Razorpay behaves
    const signature = req.headers["x-razorpay-signature"]

    //no need to go in-depth of these 3 lines
    const shasum = crypto.createHmac("sha256", webhookSecret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest("hex")

    if(signature === digest){
        console.log("Payment is authorized")

        //this is how Razorpay behaves
        const {courseId, userId} = req.body.payload.entity.notes

        try{

            const enrolledCourse = await Course.findByIdAndUpdate(courseId,
                {$push: {studentsEnrolled: userId}}, {new: true})
            
            //validation not needed I think
            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"Error in finding and updating the course"
                })
            }

            console.log("Updated course:", enrolledCourse)

            const enrolledUser = await User.findByIdAndUpdate(userId,
                {$push: {courses: courseId}}, {new: true})
            
            console.log("Updated user:", enrolledUser)

            const emailResponse = await mailSender(
                enrolledUser.email, "Congratulations!!", "Congrats!, you've been enrolled in a new course" 
            )

            console.log("Email response:", emailResponse)
            return res.status(200).json({
                success:true,
                message:'Signature verified and course added'
            })


        }catch(e){
            return res.status(500).json({
                success:false,
                message:"Error updating the details",
    
            })
        }
    }else{

        return res.status(400).json({
            success:true,
            message:"Signature not verified"
        })


    }




}


