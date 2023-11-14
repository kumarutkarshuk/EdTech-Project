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
            updatedSection

        })
    }
}

//hw: update and delete