const Tag = require('../models/Tag')

exports.createTag = async (req, res) => {
    try{
        const{name, description} = req.body
        
        //I think we'll set them null initially in the frontend
        if(!name || !description){
            res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const tagDetails = await Tag.create({name, description})
        console.log("Tag Details:", tagDetails)
        res.status(200).json({
            success:true,
            message:"Tag created successfully"
        })



    }catch(e){
        res.status(500).json({
            success:false,
            message: e.message
        })
    }
}

exports.showAllTags = async (req, res) =>{
    try{
        //name and description should be present in all tags
        const allTags = Tag.find({}, {name:true, description:true})
        res.status(200).json({
            success:true,
            message:"All tags fetched successfully",
            allTags
        })
    }catch(e){
        res.status(500).json({
            success:false,
            message: e.message
        })
    }
}