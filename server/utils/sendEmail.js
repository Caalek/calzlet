require("dotenv").config({path: "../.env"})

const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "gmail",
    user: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        type: "login",
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
})


const sendEmail = async (options) => {
    options.from = '"Calzlet" <calzletapp@gmail.com>'
    let info = await transporter.sendMail(options)
}

module.exports = sendEmail

