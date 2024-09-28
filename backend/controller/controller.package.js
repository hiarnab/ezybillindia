const packageModel = require('../model/model.package');

async function getPackage(PropertyNo) {
  try {
    const packages = await packageModel.getPackage(PropertyNo);
    return { success: true, packages };
  }
  catch (err) {
    console.log(err);
    return { success: false, status: 500, message: 'Internal Server Error' };
  }
}

async function getPlan() {
  try {
    const plan = await packageModel.getPlan();
    return { success: true, plan };
  }
  catch (err) {
    console.log(err);
    return { success: false, status: 500, message: 'Internal Server Error'};
  }
}

module.exports = {
  getPackage,
  getPlan
};
