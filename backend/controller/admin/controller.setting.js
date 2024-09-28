const PackageModel = require('../../model/admin/model.setting');

async function getAllpackage() {
  try {
    const packageSetting = await PackageModel.getAllpackage();
    return { success: true, packageSetting };
  }
  catch (err) {
    console.log(err);
    return { success: false, status: 500, message: 'Internal Server Errorrr' };
  }
}

async function insertAllpackage(pack) {
  
  try {
    const result = await PackageModel.insertAllpackage(pack);
    return { success: true, updatedData: result.updatedData };
  } catch (error) {
    console.error('Error in controller:', error);
    return { success: false, status: 500, message: 'Internal Server Error' };
  }
}

module.exports = {
  getAllpackage,
  insertAllpackage
};
