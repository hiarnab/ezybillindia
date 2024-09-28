const bcrypt = require('bcryptjs');
const menueModel = require('../../model/admin/model.profile');

async function getAllprofile(userId) {
  try {
    const getprofile = await menueModel.getallprofile(userId);
    return { success: true, getprofile };
  }
  catch (err) {
    console.log(err);
    return { success: true, status: 500, message: 'Inrernal Server Error' };
  }
}

async function updatePassword(newPasswords, userId) {
  try {
    const result = await menueModel.updatePassword(newPasswords, userId);

    return { success: result.success, status: result.success ? 200 : 500, message: result.success ? 'Password updated successfully' : result.error };
  }
  catch (error) {
    console.error('Error in UPDATE PASSWORD:', error);
    return { success: false, status: 500, message: 'Internal server error' };
  }
}

module.exports = {
  getAllprofile,
  updatePassword
};
