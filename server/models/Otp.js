const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const emailTemplate = require('../mail/templates/emailVerificationTemplate')
const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:Number,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires: 10*60
    }
})


//function to send email
//position of this code is critical
async function sendVerificationEmail(email, otp){
    try{
        const mailResponse = await mailSender(email, 'Verify your email', emailTemplate(otp));
        console.log('email sent successfully', mailResponse);
    }catch(e){
        console.log('error in sending email', e);
        throw error
    }
}

//next since it is a middleware(pre to be specific)
otpSchema.pre('save', async function(next){
    await sendVerificationEmail(this.email, this.otp); //use this keyword is intuitive
    next();
})


module.exports = mongoose.model('Otp', otpSchema)