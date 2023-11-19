const SubSection = require('../models/SubSection')
const Section = require('../models/Section')
//I think name of the variable below can be anything
const {uploadImageToCloudinary}  = require('../utils/imageUploader')
require('dotenv').config()

exports.createSubSection = async (req, res)=>{
    try{

        const {sectionId, title, timeDuration, description} = req.body

        //extract video
        const video = req.files.videoFile

        if(!sectionId || !title || !timeDuration || !description || !video){
            res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME)

        const subSectionDetails = await SubSection.create({
            title, timeDuration, description, videoUrl: uploadDetails.secure_url
        })

        //populate
        const updatedSection = await Section.findByIdAndUpdate(sectionId, {
            $push:{subSection: subSectionDetails._id}
        }, {new:true})

        res.status(200).json({
            success:true,
            message:"Sub-Section created successfully"
        })

    }catch(e){
        res.status(500).json({
            success:false,
            error:e.message,
            message:"Error creating the sub-section",
            

        })
    }
}

//hw: update and delete -> done -> sol is not there
exports.updateSubSection = async (req, res)=>{
    try{
        const {sectionId, title, timeDuration, description, subSectionId} = req.body

        //extract new video
        const video = req.files.videoFile

        //assuming everything is required while updating
        if(!sectionId || !title || !timeDuration || !description || !video || !subSectionId){
            res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        //how to make this efficient?
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME)

        const subSectionDetails = await SubSection.findByIdAndUpdate(SubSectionId, {
            title, timeDuration, description, videoUrl: uploadDetails.secure_url
        }, {new: true})
        
        res.status(200).json({
            success:true,
            message:"Sub-Section updated successfully"
        })

    }catch(e){
        res.status(500).json({
            success:false,
            error:e.message,
            message:"Error updating the sub-section",

        })
    }
}

exports.deleteSubSection = async (req, res)=>{
    try{


        const {sectionId, subSectionId} = req.body

        //I think validation isn't required

        //It will be checked if sub section id has to be del from section or not
        await SubSection.findOneAndDelete(subSectionId)

        res.status(200).json({
            success:true,
            message:"Sub-Section deleted successfully"
        })


    }catch(e){
        res.status(500).json({
            success:false,
            error:e.message,
            message:"Error deleting the sub-section",

        })
    }
}