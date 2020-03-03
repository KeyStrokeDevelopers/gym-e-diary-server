require('../models/access.model')
require('../models/categories.model')
require('../models/class.model')
require('../models/gymInfo.model')
require('../models/masterInfo.model')
require('../models/masterPackage.model')
require('../models/paymentMethod.model')
require('../models/purpose.model')
require('../models/smsPackage.model')
require('../models/smsSubscription.model')
require('../models/staff.model')
require('../models/masterPackageSubscription.model')
require('../models/enquiry.model')
require('../models/addMember.model')
require('../models/expenseIncome.model')
require('../models/measurement.model')
require('../models/vendorPackage.model')
require('../models/vendorPackageSubscription.model')
require('../models/classSubscription.model')
require('../models/media.model')
require('../models/purposeSubscription.model')
require('../models/productType.model')
require('../models/brandUnit.model')
require('../models/product.model')
require('../models/workoutNutrition.model')
require('../models/orderSummary.model')
require('../models/accountDetails.model')
require('../models/invoiceIn.model')
require('../models/transaction.model')
require('../models/account.model')
require('../models/smsLog.model')
require('../models/attendance.model')
require('../models/staffAttendance.model')

const switchConnection = async (dbName, model) => {
    const dbConnection = await global.clientConnection;
    const db = await dbConnection.useDb(dbName);
    const selectedModel = await db.model(model);
    return new Promise((resolve, reject) => {
        resolve(selectedModel)
    })
}

//export default switchConnection;

module.exports = switchConnection;
