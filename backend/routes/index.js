const express = require('express');

const router = express.Router({ mergeParams: true });
const userRoute = require('./route.user');
const propertyRoute = require('./route.property');
const itemCategoryRoute = require('./route.itemCategory');
const itemRoute = require('./route.item');
const productRoute = require('./route.product');
const menuRoute = require('./route.imageMenu');
const homeRoute = require('./route.home');
const adminloginRoute = require('./route.admin');
const packageRoute = require('./route.packagePlan');
const dispalypackageRoute = require('./route.package');
const adminpropertyRoute = require('./route.adminproperty');
const adminsetting = require('./route.adminSetting');
const adminprofile = require('./route.adminProfile');
const adminprofileUpdate = require('./route.adminProfile');
const adminplanadd = require('./route.adminSetting');
const razorpay = require('./route.razorpay');
const adminMenu = require('./route.adminmenu');
const adminPayment = require('./route.adminpayment');
const userPayment = require('./route.payment');
const propertyupdate = require('./route.adminproperty');
const admindisableacc = require('./route.admindisableacc');
const adminlifetimefree = require('./route.adminlifetimefree');
const admintools = require('./route.admintools');
// ****************************************** Dashboard Route ***********************************************************
const adminDashboard = require('./route.admindashboard');
const inactiveproperty = require('./route.admindashboard');
const packageRenewal = require('./route.admindashboard');
const paymentToday = require('./route.admindashboard');
const paymentThisweek = require('./route.admindashboard');
const paymentThismonth = require('./route.admindashboard');
// ****************************************** Dashboard Route ***********************************************************
router.use('/home', homeRoute);
router.use('/user', userRoute);
router.use('/property/:PropertyNo/itemCtegory/:CategoryRN/item/:ItemNameRN/product', productRoute);
router.use('/property/:PropertyNo/itemCtegory/:CategoryRN/item', itemRoute);
router.use('/property/:PropertyNo/itemCtegory', itemCategoryRoute);
router.use('/property/:PropertyNo/menu', menuRoute);
router.use('/property', propertyRoute);
router.use('/login', adminloginRoute);
router.use('/package/setting', packageRoute);
router.use('/package', dispalypackageRoute);
router.use('/admin/property', adminpropertyRoute);
router.use('/admin/setting', adminsetting);
router.use('/admin/profile', adminprofile);
router.use('/admin/password', adminprofileUpdate);

router.use('/update', adminplanadd);
router.use('/menu', adminMenu);
router.use('/payment', adminPayment);

router.use('/insert/plan', adminplanadd);
router.use('/razorpay', razorpay);
router.use('/user/payment', userPayment);
router.use('/update/property', propertyupdate);

router.use('/dashboard', adminDashboard);
router.use('/inactivepro', inactiveproperty);
router.use('/package/renew', packageRenewal);
router.use('/payment', paymentToday);
router.use('/payment/week', paymentThisweek);
router.use('/payment/month', paymentThismonth);

router.use('/disableacc', admindisableacc);
router.use('/lifetimefree', adminlifetimefree);
router.use('/tools', admintools);
module.exports = router;
