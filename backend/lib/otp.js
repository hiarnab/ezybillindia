const sms = require('../util/sms');
const mail = require('../util/mail');
const otpModel = require('../model/model.otp');
const emailTemplates = require('../emailTemplates/otpTemplate');

function generateOTP() {
  const digits = '0123456789';
  const firstDigit = '123456789';
  let OTP = firstDigit[Math.floor(Math.random() * 9)];
  for (let i = 1; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

/**
 *
 * @param {String} email
 * @param {Number} number
 * @param {String} type
 * @returns Object
 */
async function sendOTP({ email, number, type }) {
  try {
    const validity = 5;
    const otp = generateOTP();
    const loginMsg = `Dear Customer, the OTP to Login to your EzyBill India account is ${otp} and valid for ${validity} min. - Eastland Microsystems`;
    const regMsg = `Welcome to EzyBill India digital services, OTP for registration is ${otp} and valid for ${validity} min - Eastland Microsystems`;
    let msg;
    if (type === 'login') msg = loginMsg;
    else if (type === 'verify') msg = regMsg;
    console.log('OTP MESSAGE - ', msg);
    if (number) {
      if (await otpModel.insert(number, otp)) {
        await sms.sendSMS(msg, number);
      }
    }
    if (email && email != null) {
      if (await otpModel.insert(email, otp)) {
        const emailBody = emailTemplates({ otp });
        await mail.sendMail(email, 'EzyBill OTP', '', emailBody);
      }
    }
    return true;
  }
  catch (err) {
    // eslint-disable-next-line
    console.log(err);
    return false;
  }
}

async function verifyOTP({ otp, email, phone }) {
  const validity = 5;
  const result = await otpModel.getOTPByChannel(phone || email, validity);
  if (result.find((res) => res.otp === otp)) {
    return true;
  }
  return false;
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
async function verifyOTPMiddleware(req, res, next) {
  try {
    if (await verifyOTP(req.body)) next();
    else res.status(401).send({ message: 'Invalid OTP', code: 'INVALID_OTP' });
  }
  catch (err) {
    // eslint-disable-next-line
    console.log(err);
    res.sendStatus(500);
  }
}

module.exports = {
  sendOTP,
  verifyOTPMiddleware
};
