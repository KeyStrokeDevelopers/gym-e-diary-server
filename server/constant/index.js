const GYM_INFO_FIELD = ['branchPic', 'branchLogo', 'branchTerms', 'branchName', 'branchAddress', 'branchCity', 'branchCity', 'branchState', 'branchPin', 'branchContact', 'branchEmail', 'branchDetails', 'branchBillCode', 'branchLimit', 'regFee', 'autoBirth', 'autoAnniv', 'autoExpired', 'appId', 'authId', 'smsApi', 'smsBalance'];

const STAFF_INFO_FIELD = ['accessLevel', 'empName', 'empAddress', 'empContact', 'empEmail', 'empCode', 'empPassword', 'joiningDate', 'salaryDate', 'empDob', 'empStatus', 'deactiveDate'];

const ACCESS_LEVEL_FIELD = ['accessLevel', 'controls', 'status', 'dated'];

const SUBSCRIPTION_FIELD = ['startDate', 'renewalDate', 'package', 'quantity', 'price', 'purchaseDate'];

const SMS_SUBSCRIPTION_FIELD = ['smsPackage', 'smsPackPrice', 'smsPackPurchaseDate'];

const STAFF_LOGIN_INFO_FIELD = ['accessLevel', 'empName', 'empAddress', 'empContact', 'empEmail', 'empCode', 'joiningDate', 'salaryDate', 'empDob', 'empStatus', 'deactiveDate']

const JWT_SECRET = 'ssfwqwjsdafnsaddfc341knklsjh143l34';

const BCRYPT_SALT_ROUNDS = 12;

export {
    GYM_INFO_FIELD,
    STAFF_INFO_FIELD,
    ACCESS_LEVEL_FIELD,
    SUBSCRIPTION_FIELD,
    SMS_SUBSCRIPTION_FIELD,
    JWT_SECRET,
    BCRYPT_SALT_ROUNDS,
    STAFF_LOGIN_INFO_FIELD
}