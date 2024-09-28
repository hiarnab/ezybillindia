const paymentModal = require('../model/model.payment');

async function getAllPayment(cus_id) {
  try {
    const payment = await paymentModal.getPayment(cus_id);
    return { success: true, payment };
  }
  catch (err) {
    console.log(err);
    return { success: false, status: 500, message: 'Internal Server Error' };
  }
}

module.exports = {
  getAllPayment
};
