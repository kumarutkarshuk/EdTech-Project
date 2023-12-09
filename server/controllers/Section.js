const Section = require('../models/Section')
const Course = require('../models/Course')
const subSection = require('../models/SubSection')

exports.createSection = async (req, res)=>{
    try{
        //I think courseId shouldn't be there -> should be there to update the course schema
        const {sectionName, courseId} = req.body
        if(!sectionName || !courseId){
            return res.status(400).json({
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
                    path: 'subSection'
                },
            }).exec()
        
        //hw: populate both section and sub section in updatedCourseDetails -> better way might be there
        

        return res.status(200).json({
            success:true,
            message:'Section created successfully',
            updatedCourseDetails 
        })
    }catch(e){
        return res.status(500).json({
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
            return res.status(400).json({
                success:false,
                message:'All fields are required'
            })
        }

        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true})

        return res.status(200).json({
            success:true,
            message:"Section updated successfully"
        })




    }catch(e){
        return es.status(500).json({
            success:false,
            error:e.message,
            message:"Error updating the section"

        })
    }
}

exports.deleteSection = async (req, res) => {
    try{

        //assuming we're receiving id as a parameter from route
        const {sectionId, courseId} = req.params

        //above details fetched from body for testing
        // const {sectionId, courseId} = req.body

        //deleting section id from course
        await Course.findByIdAndUpdate(courseId, {$pull: {courseContent: sectionId}}, {new:true})

        //delete sub sections also
        const sectionDetails = await Section.findById(sectionId)
        sectionDetails.subSection.forEach(async (id) => await subSection.findByIdAndDelete(id))

        //not validating
        await Section.findByIdAndDelete(sectionId)
        
        //do we need to delete the id from the course schema -> will check while testing

        return res.status(200).json({
            success:true,
            message:"Section deleted successfully"
        })

    }catch(e){
        return res.status(500).json({
            success:false,
            error:e.message,
            message:"Error deleting the section"

        })
    }
}