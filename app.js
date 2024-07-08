const nodemailer = require('nodemailer');
require('dotenv').config()
const fs = require('fs');


// Lies die Empfängerliste aus einer JSON-Datei
const recipients = JSON.parse(fs.readFileSync('recipients.json', 'utf8'));
const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    secure: process.env.SECURE,
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
    }
});

// Funktion zum Senden einer E-Mail
function sendMail(recipient) {
    const mailOptions = {
        from: process.env.MAIL_FROM,
        to: recipient.mail,
        subject: process.env.MAIL_SUBJECT,
        text: process.env.BODY
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}

recipients.forEach(sendMail);
