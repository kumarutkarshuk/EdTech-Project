const cloudinary = require('cloudinary').v2

exports.uploadImageToCloudinary = async (file, folder, height, quality)=>{

        //why configuration isn't done?
        const options = {folder}

        //how height and quality will be set to null?
        if(height){
            options.height = height
        }
        if(quality){
            options.quality = quality
        }
        options.resource_type = 'auto'

        return await cloudinary.uploader.upload(file.tempFilePath, options)


    
}