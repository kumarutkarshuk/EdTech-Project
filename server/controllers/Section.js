const Section = require('../models/Section')
const Course = require('../models/Course')

exports.createSection = async (req, res)=>{
    try{
        //I think courseId shouldn't be there -> should be there to update the course schema
        const {sectionName, courseId} = req.body
        if(!sectionName || !courseId){
            res.status(400).json({
                success:false,
                message:'All fields are required'
            })
        }
        
        const newSection = await Section.create({sectionName})

        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
            {
                $push:{courseContent: newSection._id}
            }, {new:true}).populate({
                path: 'courseContent',
                populate: {
                    path: 'tasks',
                    populate: {
                        path: 'subSection',
                    },
                },
            }).exec()
        
        //hw: populate both section and sub section in updatedCourseDetails -> better way might be there

        res.status(200).json({
            success:true,
            message:'Section created successfully',
            updatedCourseDetails 
        })
    }catch(e){
        res.status(500).json({
            success:false,
            message:'Error in creating section'
        })
    }
    
}

exports.updateSection = async (req, res)=>{
    try{

        //See why sectionId is required
        const{sectionName, sectionId} = req.body

        if(!sectionName){
            res.status(400).json({
                success:false,
                message:'All fields are required'
            })
        }

        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true})

        res.status(200).json({
            success:true,
            message:"Section updated successfully"
        })




    }catch(e){
        res.status(500).json({
            success:false,
            error:e.message,
            message:"Error updating the section"

        })
    }
}

exports.deleteSection = async (req, res) => {
    try{

        //assuming we're receiving id as a parameter from route
        const {sectionId} = req.params


        //not validating
        await Section.findByIdAndDelete(sectionId)
        
        //do we need to delete the id from the course schema -> will check while testing

        res.status(200).json({
            success:true,
            message:"Section deleted successfully"
        })

    }catch(e){
        res.status(500).json({
            success:false,
            error:e.message,
            message:"Error deleting the section"

        })
    }
}