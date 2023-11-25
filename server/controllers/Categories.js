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

exports.categoryPageDetails = async (req, res) => {
    try{

        const {categoryId} = req.body

        const selectedCategory = await Category.findById(categoryId).populate("courses").exec()

        if(!selectedCategory){
            res.status(404).json({
                success:false,
                message:"Courses with selected category not found"
            })
        }

        //get categories whose id is not of the selected category
        //ne -> not equal
        const differentCategories = await Category.find({
            _id: {$ne: categoryId}
        }).populate("courses").exec()


        //hw -> get top 10 selling courses -> I think if number of times a course is sold is known,
        //it will be an efficient approach -> doubt
        //I'll use the longer way for now
        // const allCategories = await Category.find().populate("courses").exec()





        res.status(200).json({
            success:true,
            data:{selectedCategory, differentCategories}
        })



    }catch(e){
        res.status(500).json({
            success:false,
            message: "Error fetching category page details"
        })
    }
}