const disableaccModel = require('../../model/admin/model.disableacc');

async function disableAcc(PropertyNo) {
  try {
    const disableacc = await disableaccModel.disableAcc(PropertyNo);
    return { success: true, disableacc };
  }
  catch (error) {
    console.log(error);
    return { success: true, status: 500, message: 'Inrernal Server Error' };
  }
}

module.exports = {
  disableAcc
};
