const lifetimefreeModel = require('../../model/admin/model.lifetimefree');

async function lifetimefree(PropertyNo) {
  try {
    const lifetime = await lifetimefreeModel.lifetimefree(PropertyNo);
    return { success: true, lifetime };
  }
  catch (err) {
    console.log(err);
    return { success: true, status: 500, message: 'Internal Server Error' };
  }
}

module.exports = {
  lifetimefree
};
