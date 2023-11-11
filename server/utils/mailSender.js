const nodemailer = require('nodemailer');
require('dotenv').config()


const mailSender = async (email, title, body) => {
    try{

        //below transporter object is same as in the file upload project and is different from the one in class code
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }

        })

        //mail options included below
        let info = await transporter.sendMail({

            from:'StudyNotion || by Utkarsh',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        })

        console.log(info);
        return info //have to look into this



    }catch(e){
        console.log(e.message)
    }
}

module.exports = mailSender