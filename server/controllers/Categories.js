const Category = require('../models/Category')

exports.createCategory = async (req, res) => {
    try{
        const{name, description} = req.body
        
        //I think we'll set them null initially in the frontend
        if(!name || !description){
            res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const categoryDetails = await Category.create({name, description})
        console.log("Category Details:", categoryDetails)
        res.status(200).json({
            success:true,
            message:"Category created successfully"
        })



    }catch(e){
        res.status(500).json({
            success:false,
            message: e.message
        })
    }
}

exports.showAllCategories = async (req, res) =>{
    try{
        //name and description should be present in all tags
        const allTags = Tag.find({}, {name:true, description:true})
        res.status(200).json({
            success:true,
            message:"All categories fetched successfully",
            allTags
        })
    }catch(e){
        res.status(500).json({
            success:false,
            message: e.message
        })
    }
}