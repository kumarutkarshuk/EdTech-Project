const mongoose = require('mongoose')

const ratingAndReviewsSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    review:{
        type:String,
        required:true,
        trim:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Course",
        //indicates that an index should be created on the corresponding field in the MongoDB collection.
        //it is used to make data retrieval efficient -> still not 100% clear
        index:true
    }
    

})

module.exports = mongoose.model('RatingAndReviews', ratingAndReviewsSchema)