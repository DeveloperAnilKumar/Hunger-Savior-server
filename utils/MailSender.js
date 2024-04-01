const nodemailer = require("nodemailer")

require("dotenv").config()


const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure:false,
                       auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        })
        return await transporter.sendMail({
            from: "By Anil kumar || ak",
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`
        })


    } catch (error) {

        console.log(error)
        console.log("issue with sending email")

    }

}

module.exports = mailSender;