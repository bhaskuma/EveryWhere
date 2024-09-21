const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    auth: {
        user: "bhaskar.kumar2021@vitalum.ac.in",
        pass: "gdsikgoqazlfopfs",
    },
});


async function sendMail(to, subject, text, html) {

    const info = await transporter.sendMail({
        from: "bhaskar.kumar2021@vitalum.ac.in", to, subject, text, html
    })





}

module.exports = { sendMail }


