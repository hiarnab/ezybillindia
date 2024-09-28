const paymentModel = require('../../model/admin/model.payment');

async function getAllpayment() {
  try {
    const getPayment = await paymentModel.getallpayment();
    return { success: true, getPayment };
  }
  catch (err) {
    console.log(err);
    return { success: true, status: 500, message: 'Internal Server Error' };
  }
}

module.exports = {
  getAllpayment
};
