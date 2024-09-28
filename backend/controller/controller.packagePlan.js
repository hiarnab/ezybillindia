const packageModel = require('../model/model.packagePlan');

async function insertPackage(package_seeting,property_id, type, amount, taxable_amount, tax, start_date, expired_at) {
    try {

        const package = {
            property_id: property_id,
            type: type,
            amount: amount,
            taxable_amount: taxable_amount,
            tax: tax,
            //start_date: start_date,
            //expired_at: expired_at,
            // created_at: new Date(),
            // updated_at: new Date(),
        };

        // Object.keys(package).forEach(key => {
        //     if (typeof package[key] === 'undefined') {
        //         package[key] = null;
        //     }
        // });

        const result = await packageModel.insertPackage(package);
        return { success: true, insertedId: result.id };
    } catch (error) {
        console.error('Error inserting package:', error);
        return { success: false, status: 500, message: 'Internal Server Error' };
    }
}

module.exports = {
    insertPackage
};