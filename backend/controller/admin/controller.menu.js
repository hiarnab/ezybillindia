const menuModel = require('../../model/admin/model.menu');

async function getAllmenu(propertyId) {
  try {
    const getmenu = await menuModel.getallmenu(propertyId);
    return { success: true, getmenu };
  }
  catch (error) {
    console.log(error);
    return { success: true, status: 500, message: 'Inrernal Server Error' };
  }
}

module.exports = {
  getAllmenu
};
