const dashboardModel = require('../../model/admin/model.dashboard');

async function getDashboard() {
  try {
    const getreport = await dashboardModel.getDashboard();
    return { success: true, getreport };
  }
  catch (error) {
    console.log(error);
    return { success: true, status: 500, message: 'Internal Server Error' };
  }
}

async function getinactiveproperty() {
  try {
    const getinactivepro = await dashboardModel.getinactiveproperty();
    return { success: true, getinactivepro };
  }
  catch (error) {
    console.log(error);
    return { success: true, status: 500, message: 'Internal Server Error' };
  }
}

async function getPackageRenewal() {
  try {
    const getPackageRen = await dashboardModel.packageRenewwal();
    return { success: true, getPackageRen };
  }
  catch (error) {
    console.log(error);
    return { success: true, status: 500, message: 'Internal Server Error'};
  }
}

async function getPaymentToday() {
  try {
    const PaymentToday = await dashboardModel.paymentToday();
    return { success: true, PaymentToday };
  }
  catch (error) {
    console.log(error);
    return { success: true, status: 500, message: 'Internal Server Error'};
  }
}

async function getPaymentThisWeek() {
  try {
    const Paymentthisweek = await dashboardModel.paymentThisweek();
    return { success: true, Paymentthisweek };
  }
  catch (error) {
    console.log(error);
    return { success: true, status: 500, message: 'Internal Server Error'};
  }
}

async function getPaymentThismonth() {
  try {
    const Paymentthimonth = await dashboardModel.paymentThismonth();
    return { success: true, Paymentthimonth };
  }
  catch (error) {
    console.log(error);
    return { success: true, status: 500, message: 'Internal Server Error'};
  }
}

module.exports = {
  getDashboard,
  getinactiveproperty,
  getPackageRenewal,
  getPaymentToday,
  getPaymentThisWeek,
  getPaymentThismonth
};
