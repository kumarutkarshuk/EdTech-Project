const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    courseDescription:{
        type:String
    },
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    whatYouWillLearn:{
        type:String
    },
    courseContent:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section"
        }]
    ,
    ratingAndReviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReviews"
    }],
    thumbnail:{
        type:"String"
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
        //required:true
    },
    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }],
    price:{
        type:Number
    },
    tags:[{ //this is different from class code
        type:String
    }],
    status: {
        type:String,
        enum:["Draft", "Published"]
    }

})

module.exports = mongoose.model('Course', courseSchema)