const nodeMailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodeMailer.createTransport({
  host: 'smtppro.zoho.in',
  secure: true,
  port: 465,
  auth: {
    user: process.env.ZOHO_USERNAME,
    pass: process.env.ZOHO_PASSWORD
  }
});

// Service Check Using Gmail
// const transporterGmail = nodeMailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: config.testEmail,
//     pass: config.testEmailPassword
//   }
// });
// function sendMail(email, subject, body) {
//   return new Promise((resolve, reject) => {
//     const mailOptions = {
//       from: 'noreply@ezybillindia.com',
//       to: email,
//       subject,
//       text,
//       html
//     };
//     transporter.sendMail(mailOptions, (err, info) => {
//       if (err) {
//         return reject(err);
//       }
//       return resolve(info);
//     });
//   });
// }
async function sendMail(email, subject, text = '', html = '') {
  const mailOptions = {
    from: config.fromEmail,
    to: email,
    cc: 'support@ezybillindia.com',
    subject,
    text,
    html
  };
  return transporter.sendMail(mailOptions);
}

module.exports = { sendMail };
