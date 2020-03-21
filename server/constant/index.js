const GYM_INFO_FIELD = ['printLogo', 'branchLogo', 'branchTerms', 'branchName', 'branchAddress', 'branchCity', 'branchCity', 'branchState', 'branchPin', 'branchContact', 'branchEmail', 'branchDetails', 'branchBillCode', 'branchLimit', 'regFee', 'autoBirth', 'autoAnniv', 'autoExpired', 'autoExpiring', 'isStaffAttendance', 'isMemberAttendance', 'gstNumber', 'appId', 'authId', 'smsApi', 'smsBalance', 'seriesStartFrom', 'membershipTC', 'billingTC'];

const STAFF_INFO_FIELD = ['accessLevel', 'staffName', 'staffAddress', 'staffContact', 'staffEmail', 'staffCode', 'staffPassword', 'staffJoiningDate', 'salaryDate', 'staffDob', 'status', 'deactiveDate', 'shiftFrom1', 'shiftFrom2', 'shiftFrom3', 'shiftTo1', 'shiftTo2', 'shiftTo3'];

const ACCESS_LEVEL_FIELD = ['accessLevel', 'controls', 'status', 'dated'];

const TRANSACTION_FIELD = ['member', 'description', 'amount', 'transactionStatus', 'paymentMode', 'paymentModeDescription', 'entryDate', 'transactionDate', 'status'];

const SMS_SUBSCRIPTION_FIELD = ['smsPackage', 'smsPackPrice', 'smsPackPurchaseDate'];

const STAFF_LOGIN_INFO_FIELD = ['accessLevel', 'staffName', 'staffAddress', 'staffContact', 'staffEmail', 'staffCode', 'staffJoiningDate', 'salaryDate', 'staffDob', 'staffStatus', 'deactiveDate']

const CATEGORY_FIELD = ['categoryType', 'category', 'status'];

const VENDOR_PACKAGE_FIELD = ['durationIn', 'packName', 'packPrice', 'packDuration', 'packDetails', 'status'];

const PAYMENT_METHOD_FIELD = ['paymentMethod', 'status'];

const ADD_MEMBER_FIELD = ['profileImage', 'birthWish', 'anniversaryWish', 'name', 'contact', 'fTitle', 'favourOf', 'alternativeContact', 'memberEmail', 'dob', 'age', 'address', 'occupation', 'bloodGroup', 'maritalStatus', 'anniversary', 'query', 'fingerCode', 'referredBy', 'status', 'numberOfShift', 'shiftFrom1', 'shiftFrom2', 'shiftFrom3', 'shiftTo1', 'shiftTo2', 'shiftTo3'];

const PURPOSE_FIELD = ['purposeName', 'nSunday', 'nMonday', 'nTuesday', 'nWednesday', 'nThursday', 'nFriday', 'nSaturday', 'wSunday', 'wMonday', 'wTuesday', 'wWednesday', 'wThursday', 'wFriday', 'wSaturday', 'status', 'member'];

const CLASS_FIELD = ['className', 'classDetail', 'classFrom', 'classTo', 'durationIn', 'classDuration', 'classPrice', 'isMon', 'isTue', 'isWed', 'isThu', 'isFri', 'isSat', 'isSun', 'classTakingBy', 'status'];


const ENQUIRY_FIELD = ['name', 'contact', 'fTitle', 'favourOf', 'alternativeContact', 'email', 'dob', 'address', 'query', 'response', 'followUp', 'followUpDate', 'referredBy', 'packageInfo', 'classInfo', 'purpose', 'enqStatus'];

const EXPENSE_INCOME_FIELD = ['paymentType', 'catName', 'staff', 'paymentMethod', 'amount', 'description', 'date', 'status'];

const MEASUREMENT_FIELD = ['member', 'date', 'weight', 'height', 'neck', 'shoulder', 'chestExtended', 'chestNormal', 'forearms', 'biceps', 'wrist', 'upper', 'lower', 'waist', 'hip', 'thigh', 'calves', 'ankles', 'blood', 'sugar', 'fat', 'bmi', 'bmr', 'medicalHistory'];

const VENDOR_PACKAGE_SUBSCRIPTION_FIELD = ['packActivation', 'renewalDate', 'packageInfo', 'member', 'packPrice', 'packDisc', 'purchaseDate', 'status', 'gstValue', 'gstPer'];

const CLASS_SUBSCRIPTION_FIELD = ['classActivation', 'renewalDate', 'classInfo', 'member', 'classPrice', 'classDisc', 'purchaseDate', 'status', 'gstValue', 'gstPer'];

const SUBSCRIPTION_FIELD = ['packActivation', 'packageName', 'packPrice', 'packDisc', 'packDuration', 'packDetail', 'purchaseDate', 'status'];

const MEDIA_FIELD = ['image', 'member', 'date', 'description', 'status'];

const PRODUCT_TYPE_FIELD = ['productType', 'hsnCode', 'gst', 'status'];

const BRAND_UNIT_FIELD = ['entryType', 'value', 'status'];

const PRODUCT_FIELD = ['brand', 'model', 'product', 'measuringUnit', 'modelNo', 'minimumQty', 'costPrice', 'sellingPrice', 'status'];

const ORDER_SUMMARY_FIELD = ['product', 'productType', 'priceFormat', 'quantity', 'price', 'gst', 'costPrice', 'basicPrice', 'gstValue', 'priceAfterDiscount', 'discountP', 'discount', 'selectedProductType', 'brandProduct'];

const ATTENDANCE_FIELD = ['member', 'date', 'packageAttendance', 'classAttendance', 'status'];

const STAFF_ATTENDANCE_FIELD = ['staff', 'date', 'attendance', 'status'];

const ACCOUNT_FIELD = ['member', 'date', 'amount', 'paymentMethod', 'description', 'status'];

const JWT_SECRET = 'ssfwqwjsdafnsaddfc341knklsjh143l34';

const BCRYPT_SALT_ROUNDS = 12;

module.exports = {
    GYM_INFO_FIELD,
    STAFF_INFO_FIELD,
    ACCESS_LEVEL_FIELD,
    SMS_SUBSCRIPTION_FIELD,
    SUBSCRIPTION_FIELD,
    JWT_SECRET,
    BCRYPT_SALT_ROUNDS,
    CATEGORY_FIELD,
    STAFF_LOGIN_INFO_FIELD,
    VENDOR_PACKAGE_FIELD,
    PAYMENT_METHOD_FIELD,
    ADD_MEMBER_FIELD,
    PURPOSE_FIELD,
    CLASS_FIELD,
    ENQUIRY_FIELD,
    EXPENSE_INCOME_FIELD,
    CLASS_SUBSCRIPTION_FIELD,
    TRANSACTION_FIELD,
    MEASUREMENT_FIELD,
    VENDOR_PACKAGE_SUBSCRIPTION_FIELD,
    MEDIA_FIELD,
    PRODUCT_TYPE_FIELD,
    BRAND_UNIT_FIELD,
    PRODUCT_FIELD,
    ORDER_SUMMARY_FIELD,
    ACCOUNT_FIELD,
    ATTENDANCE_FIELD,
    STAFF_ATTENDANCE_FIELD
}