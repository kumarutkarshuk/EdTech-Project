const nodemailer = require('nodemailer');
require('dotenv').config()


const mailSender = async (email, title, body) => {
    try{

        //below transporter object is same as in the file upload project
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }

        })

        let info = await transporter.sendMail({

            from:'StudyNotion || CodeHelp - by Babbar',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        })

        console.log(info);
        return info



    }catch(e){
        console.log(e.message)
    }
}

module.exports = mailSender