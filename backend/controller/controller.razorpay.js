const Razorpay = require('razorpay');
const config = require('../config/config');
const razorpaymodal = require('../model/model.razorpay');
const db = require('../lib/db');
const mail = require('../util/mail');
const emailTemplates = require('../emailTemplates/paymentConf');

async function createOrder(req, res) {
  try {
    const razorpay = new Razorpay({
      key_id: config.key_id,
      key_secret: config.key_secret
    });
    const connection = await db();
    const propName = 'SELECT * FROM tblmasterproperty WHERE PropertyNo = ?';
    const [propNameResult] = await connection.query(propName, [req.body.PropertyNo]);

    const option = {
      amount: req.body.amount,
      currency: req.body.currency,
      receipt: 'receipt#1',
      payment_capture: 1,
      notes: {
        days: req.body.days,
        cus_id: req.body.cus_id,
        id: req.body.id,
        PropertyNo: req.body.PropertyNo,
        propertyName: propNameResult[0].PropName,
        cusName: req.body.cusName
      }
    };

    const response = await razorpay.orders.create(option);
    //console.log(response);
    return res.status(200).json({ success: true, orderData: response });
  }
  catch (error) {
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

async function paymentDetails(req, res) {

  const paymentId = req.params.paymentId;
  // console.log(paymentId);
  const razorpay = new Razorpay({
    key_id: config.key_id,
    key_secret: config.key_secret
  });

  try {
    const payment = await razorpay.payments.fetch(paymentId);
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    } else {
      const newpayment = await razorpaymodal.insertPayment(payment);
      const user = await razorpaymodal.custDetails(payment.notes.cus_id);

      if (payment.status === 'captured' && user[0]?.RegEmail) {

        const emailBody = emailTemplates({user, payment});
        
        if (!emailBody) {
          return res.status(500).json({ success: false, message: 'Email template generation failed' });
        }
        await mail.sendMail(user[0].RegEmail, 'Payment received successfully', '', emailBody);
      }
      return res.status(200).json({ success: true, data: payment });
    }

  } catch (error) {
    console.error('Error fetching payment details:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

module.exports = {
  createOrder,
  paymentDetails
};
