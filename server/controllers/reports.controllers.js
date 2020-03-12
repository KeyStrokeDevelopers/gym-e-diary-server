const { getAge } = require('../constant/ageCalculate')
const switchConnection = require('../databaseConnection/switchDb')
const moment = require('moment')
const classSubscriptionModel = require('../models/classSubscription.model')

/**
 * 
 * @param {*} req 
 * @param {*} res
 * Pending Payment Report 
 */
const getPendingPaymentsData = async (req, res) => {
    try {
        const PurposeSubscription = await switchConnection(req.user.newDbName, "PurposeSubscription");
        const Transaction = await switchConnection(req.user.newDbName, "Transaction");
        const AddMember = await switchConnection(req.user.newDbName, "AddMember");
        const activeMember = await AddMember.find({ status: 1 });
        let pendingPaymentData = activeMember.map(async (data) => {
            const memberTransactionData = await Transaction.find({ member: data._id });
            let totalCredit = 0;
            let totalDebit = 0;
            memberTransactionData.map(async (transData) => {
                if (transData.transactionStatus === 'Debit') {
                    totalDebit = totalDebit + transData.amount
                } else {
                    totalCredit = totalCredit + transData.amount
                }
            })
            if (totalDebit - totalCredit > 0) {
                let age = getAge(data.dob);
                const purpose_data = await PurposeSubscription.findOne({ member: data._id });
                let contactValue = data.alternativeContact ? `${data.contact},${data.alternativeContact}` : data.contact;
                return { memberId: data._id, form: data.regNo, member: `${data.name} ${data.fTitle} ${data.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.bloodGroup, fingercode: data.fingerCode, purpose: purpose_data.purposeName };
            }
        })
        let pending_payments = await Promise.all(pendingPaymentData);
        const finalReport = pending_payments.filter((item) => item)
        console.log('finalreport ===', finalReport)
        if (finalReport) {
            res.status(200).send(finalReport);
        } else {
            res.status(200).send({});
        }

    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}


/**
 * 
 * @param {*} req 
 * @param {*} res
 * Active Members Report 
 */
const getReports = async (req, res) => {

    // {
    //     reportType: 'Active',
    //     subscriptionType: 'All',
    //     packageClass: 'All',
    //     expiringIn: 5
    //   }
    console.log('req.body------', req.body)
    try {
        const { reportType, subscriptionType, packageClass, expiringIn } = req.body;
        const Transaction = await switchConnection(req.user.newDbName, "Transaction");
        const ClassSubscription = await switchConnection(req.user.newDbName, "ClassSubscription");
        const VendorPackageSubscription = await switchConnection(req.user.newDbName, "VendorPackageSubscription");
        const Attendance = await switchConnection(req.user.newDbName, "Attendance");
        let reportsData = [];
        if (reportType === 'Active' && subscriptionType === 'Class' && packageClass === 'All') {
            const classSubscriptionActiveData = await ClassSubscription.find({ $and: [{ renewalDate: { $gte: new Date() } }, { classActivation: { $lte: new Date() } }, { freeze: { $eq: 0 } }] }).populate('member');
            reportsData = classSubscriptionActiveData.map(async (data) => {
                const memberTransactionData = await Transaction.find({ member: data.member._id });
                let totalCredit = 0;
                let totalDebit = 0;
                memberTransactionData.map(async (transData) => {
                    if (transData.transactionStatus === 'Debit') {
                        totalDebit = totalDebit + transData.amount
                    } else {
                        totalCredit = totalCredit + transData.amount
                    }
                })
                let age = getAge(data.member.dob);
                let contactValue = data.member.alternativeContact ? `${data.member.contact},${data.member.alternativeContact}` : data.member.contact;
                let attendance;
                if (req.body.date) {
                    attendance = await Attendance.findOne({ $and: [{ date: req.body.date }, { member: data.member._id }] });
                }


                return { memberId: data.member._id, form: data.member.regNo, member: `${data.member.name} ${data.member.fTitle} ${data.member.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.member.bloodGroup, fingercode: data.member.fingerCode, birthWish: data.member.birthWish, anniversaryWish: data.member.anniversaryWish, dob: data.member.dob, anniversary: data.member.anniversary, callDate: data.member.callDate, dnd: data.member.dnd, attendance: attendance && attendance.classAttendance };
            })
        } else if (reportType === 'Active' && subscriptionType === 'Package' && packageClass === 'All') {
            const vendorPackageActiveData = await VendorPackageSubscription.find({ $and: [{ renewalDate: { $gte: new Date() } }, { packActivation: { $lte: new Date() } }, { freeze: { $eq: 0 } }] }).populate('member');
            reportsData = vendorPackageActiveData.map(async (data) => {
                const memberTransactionData = await Transaction.find({ member: data.member._id });
                let totalCredit = 0;
                let totalDebit = 0;
                memberTransactionData.map(async (transData) => {
                    if (transData.transactionStatus === 'Debit') {
                        totalDebit = totalDebit + transData.amount
                    } else {
                        totalCredit = totalCredit + transData.amount
                    }
                })
                let attendance;
                if (req.body.date) {
                    attendance = await Attendance.findOne({ $and: [{ date: req.body.date }, { member: data.member._id }] });
                }
                let age = getAge(data.member.dob);
                let contactValue = data.member.alternativeContact ? `${data.member.contact},${data.member.alternativeContact}` : data.member.contact;
                return {
                    memberId: data.member._id, form: data.member.regNo, member: `${data.member.name} ${data.member.fTitle} ${data.member.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.member.bloodGroup, fingercode: data.member.fingerCode, birthWish: data.member.birthWish, anniversaryWish: data.member.anniversaryWish, dob: data.member.dob, anniversary: data.member.anniversary, callDate: data.member.callDate, dnd: data.member.dnd, attendance: attendance && attendance.packageAttendance
                };
            })
        } else if (reportType === 'Active' && subscriptionType === 'Class' && packageClass && packageClass !== 'All') {
            const classSubscriptionActiveData = await ClassSubscription.find({ $and: [{ classInfo: { $eq: packageClass } }, { renewalDate: { $gte: new Date() } }, { classActivation: { $lte: new Date() } }, { freeze: { $eq: 0 } }] }).populate('member');
            reportsData = classSubscriptionActiveData.map(async (data) => {
                const memberTransactionData = await Transaction.find({ member: data.member._id });
                let totalCredit = 0;
                let totalDebit = 0;
                memberTransactionData.map(async (transData) => {
                    if (transData.transactionStatus === 'Debit') {
                        totalDebit = totalDebit + transData.amount
                    } else {
                        totalCredit = totalCredit + transData.amount
                    }
                })
                let age = getAge(data.member.dob);
                let contactValue = data.member.alternativeContact ? `${data.member.contact},${data.member.alternativeContact}` : data.member.contact;
                return { memberId: data.member._id, form: data.member.regNo, member: `${data.member.name} ${data.member.fTitle} ${data.member.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.member.bloodGroup, fingercode: data.member.fingerCode, birthWish: data.member.birthWish, anniversaryWish: data.member.anniversaryWish, dob: data.member.dob, anniversary: data.member.anniversary, callDate: data.member.callDate, dnd: data.member.dnd };
            })
        } else if (reportType === 'Active' && subscriptionType === 'Package' && packageClass && packageClass !== 'All') {
            const vendorPackageActiveData = await VendorPackageSubscription.find({ $and: [{ packageInfo: { $eq: packageClass } }, { renewalDate: { $gte: new Date() } }, { packActivation: { $lte: new Date() } }, { freeze: { $eq: 0 } }] }).populate('member');
            reportsData = vendorPackageActiveData.map(async (data) => {
                const memberTransactionData = await Transaction.find({ member: data.member._id });
                let totalCredit = 0;
                let totalDebit = 0;
                memberTransactionData.map(async (transData) => {
                    if (transData.transactionStatus === 'Debit') {
                        totalDebit = totalDebit + transData.amount
                    } else {
                        totalCredit = totalCredit + transData.amount
                    }
                })
                let age = getAge(data.member.dob);
                let contactValue = data.member.alternativeContact ? `${data.member.contact},${data.member.alternativeContact}` : data.member.contact;
                return { memberId: data.member._id, form: data.member.regNo, member: `${data.member.name} ${data.member.fTitle} ${data.member.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.member.bloodGroup, fingercode: data.member.fingerCode, birthWish: data.member.birthWish, anniversaryWish: data.member.anniversaryWish, dob: data.member.dob, anniversary: data.member.anniversary, callDate: data.member.callDate, dnd: data.member.dnd };
            })
        } else if (reportType === 'Active' && subscriptionType === 'All') {
            const classSubscriptionActiveData = await ClassSubscription.find({ $and: [{ renewalDate: { $gte: new Date() } }, { classActivation: { $lte: new Date() } }, { freeze: { $eq: 0 } }] }).populate('member');
            let classReportsData = classSubscriptionActiveData.map(async (data) => {
                const memberTransactionData = await Transaction.find({ member: data.member._id });
                let totalCredit = 0;
                let totalDebit = 0;
                memberTransactionData.map(async (transData) => {
                    if (transData.transactionStatus === 'Debit') {
                        totalDebit = totalDebit + transData.amount
                    } else {
                        totalCredit = totalCredit + transData.amount
                    }
                })
                let attendance;
                if (req.body.date) {
                    attendance = await Attendance.findOne({ $and: [{ date: req.body.date }, { member: data.member._id }] });
                }
                let age = getAge(data.member.dob);
                let contactValue = data.member.alternativeContact ? `${data.member.contact},${data.member.alternativeContact}` : data.member.contact;
                return { memberId: data.member._id, form: data.member.regNo, member: `${data.member.name} ${data.member.fTitle} ${data.member.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.member.bloodGroup, fingercode: data.member.fingerCode, birthWish: data.member.birthWish, anniversaryWish: data.member.anniversaryWish, dob: data.member.dob, anniversary: data.member.anniversary, callDate: data.member.callDate, dnd: data.member.dnd, attendance: attendance && attendance.classAttendance };
            })
            const vendorPackageActiveData = await VendorPackageSubscription.find({ $and: [{ renewalDate: { $gte: new Date() } }, { packActivation: { $lte: new Date() } }, { freeze: { $eq: 0 } }] }).populate('member');
            let packageReportsData = vendorPackageActiveData.map(async (data) => {
                const memberTransactionData = await Transaction.find({ member: data.member._id });
                let totalCredit = 0;
                let totalDebit = 0;
                memberTransactionData.map(async (transData) => {
                    if (transData.transactionStatus === 'Debit') {
                        totalDebit = totalDebit + transData.amount
                    } else {
                        totalCredit = totalCredit + transData.amount
                    }
                })
                let attendance;
                if (req.body.date) {
                    attendance = await Attendance.findOne({ $and: [{ date: req.body.date }, { member: data.member._id }] });
                }
                let age = getAge(data.member.dob);
                let contactValue = data.member.alternativeContact ? `${data.member.contact},${data.member.alternativeContact}` : data.member.contact;
                return { memberId: data.member._id, form: data.member.regNo, member: `${data.member.name} ${data.member.fTitle} ${data.member.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.member.bloodGroup, fingercode: data.member.fingerCode, birthWish: data.member.birthWish, anniversaryWish: data.member.anniversaryWish, dob: data.member.dob, anniversary: data.member.anniversary, callDate: data.member.callDate, dnd: data.member.dnd, attendance: attendance && attendance.packageAttendance };
            })
            reportsData = [...classReportsData, ...packageReportsData];
        } else if (reportType === 'All' && subscriptionType === 'All') {
            const classSubscriptionActiveData = await ClassSubscription.find().populate('member');
            let classReportsData = classSubscriptionActiveData.map(async (data) => {
                const memberTransactionData = await Transaction.find({ member: data.member._id });
                let totalCredit = 0;
                let totalDebit = 0;
                memberTransactionData.map(async (transData) => {
                    if (transData.transactionStatus === 'Debit') {
                        totalDebit = totalDebit + transData.amount
                    } else {
                        totalCredit = totalCredit + transData.amount
                    }
                })
                let age = getAge(data.member.dob);
                let contactValue = data.member.alternativeContact ? `${data.member.contact},${data.member.alternativeContact}` : data.member.contact;
                return { memberId: data.member._id, form: data.member.regNo, member: `${data.member.name} ${data.member.fTitle} ${data.member.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.member.bloodGroup, fingercode: data.member.fingerCode, birthWish: data.member.birthWish, anniversaryWish: data.member.anniversaryWish, dob: data.member.dob, anniversary: data.member.anniversary, callDate: data.member.callDate, dnd: data.member.dnd };
            })
            const vendorPackageActiveData = await VendorPackageSubscription.find().populate('member');
            let packageReportsData = vendorPackageActiveData.map(async (data) => {
                const memberTransactionData = await Transaction.find({ member: data.member._id });
                let totalCredit = 0;
                let totalDebit = 0;
                memberTransactionData.map(async (transData) => {
                    if (transData.transactionStatus === 'Debit') {
                        totalDebit = totalDebit + transData.amount
                    } else {
                        totalCredit = totalCredit + transData.amount
                    }
                })
                let age = getAge(data.member.dob);
                let contactValue = data.member.alternativeContact ? `${data.member.contact},${data.member.alternativeContact}` : data.member.contact;
                return { memberId: data.member._id, form: data.member.regNo, member: `${data.member.name} ${data.member.fTitle} ${data.member.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.member.bloodGroup, fingercode: data.member.fingerCode, birthWish: data.member.birthWish, anniversaryWish: data.member.anniversaryWish, dob: data.member.dob, anniversary: data.member.anniversary, callDate: data.member.callDate, dnd: data.member.dnd };
            })
            reportsData = [...classReportsData, ...packageReportsData];
        } else if (reportType === 'Expiring' && subscriptionType === 'Class' && packageClass === 'All') {
            const classSubscriptionActiveData = await ClassSubscription.find({ $and: [{ renewalDate: { $gte: new Date() } }, { renewalDate: { $lte: (new Date().getTime() + (req.body.expiringIn * 86400000)) } }, { classActivation: { $lte: new Date() } }, { freeze: { $eq: 0 } }] }).populate('member');
            reportsData = classSubscriptionActiveData.map(async (data) => {
                const memberTransactionData = await Transaction.find({ member: data.member._id });
                let totalCredit = 0;
                let totalDebit = 0;
                memberTransactionData.map(async (transData) => {
                    if (transData.transactionStatus === 'Debit') {
                        totalDebit = totalDebit + transData.amount
                    } else {
                        totalCredit = totalCredit + transData.amount
                    }
                })
                let age = getAge(data.member.dob);
                let contactValue = data.member.alternativeContact ? `${data.member.contact},${data.member.alternativeContact}` : data.member.contact;
                return { memberId: data.member._id, form: data.member.regNo, member: `${data.member.name} ${data.member.fTitle} ${data.member.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.member.bloodGroup, fingercode: data.member.fingerCode, birthWish: data.member.birthWish, anniversaryWish: data.member.anniversaryWish, dob: data.member.dob, anniversary: data.member.anniversary, callDate: data.member.callDate, dnd: data.member.dnd };
            })
        } else if (reportType === 'Expiring' && subscriptionType === 'Package' && packageClass === 'All') {
            const vendorPackageActiveData = await VendorPackageSubscription.find({ $and: [{ renewalDate: { $gte: new Date() } }, { renewalDate: { $lte: (new Date().getTime() + (req.body.expiringIn * 86400000)) } }, { packActivation: { $lte: new Date() } }, { freeze: { $eq: 0 } }] }).populate('member');
            reportsData = vendorPackageActiveData.map(async (data) => {
                const memberTransactionData = await Transaction.find({ member: data.member._id });
                let totalCredit = 0;
                let totalDebit = 0;
                memberTransactionData.map(async (transData) => {
                    if (transData.transactionStatus === 'Debit') {
                        totalDebit = totalDebit + transData.amount
                    } else {
                        totalCredit = totalCredit + transData.amount
                    }
                })
                let age = getAge(data.member.dob);
                let contactValue = data.member.alternativeContact ? `${data.member.contact},${data.member.alternativeContact}` : data.member.contact;
                return { memberId: data.member._id, form: data.member.regNo, member: `${data.member.name} ${data.member.fTitle} ${data.member.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.member.bloodGroup, fingercode: data.member.fingerCode, birthWish: data.member.birthWish, anniversaryWish: data.member.anniversaryWish, dob: data.member.dob, anniversary: data.member.anniversary, callDate: data.member.callDate, dnd: data.member.dnd };
            })
        } else if (reportType === 'Expiring' && subscriptionType === 'Class' && packageClass && packageClass !== 'All') {
            const classSubscriptionActiveData = await ClassSubscription.find({ $and: [{ classInfo: { $eq: packageClass } }, { renewalDate: { $gte: new Date() } }, { renewalDate: { $lte: (new Date().getTime() + (req.body.expiringIn * 86400000)) } }, { classActivation: { $lte: new Date() } }, { freeze: { $eq: 0 } }] }).populate('member');
            reportsData = classSubscriptionActiveData.map(async (data) => {
                const memberTransactionData = await Transaction.find({ member: data.member._id });
                let totalCredit = 0;
                let totalDebit = 0;
                memberTransactionData.map(async (transData) => {
                    if (transData.transactionStatus === 'Debit') {
                        totalDebit = totalDebit + transData.amount
                    } else {
                        totalCredit = totalCredit + transData.amount
                    }
                })
                let age = getAge(data.member.dob);
                let contactValue = data.member.alternativeContact ? `${data.member.contact},${data.member.alternativeContact}` : data.member.contact;
                return { memberId: data.member._id, form: data.member.regNo, member: `${data.member.name} ${data.member.fTitle} ${data.member.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.member.bloodGroup, fingercode: data.member.fingerCode, birthWish: data.member.birthWish, anniversaryWish: data.member.anniversaryWish, dob: data.member.dob, anniversary: data.member.anniversary, callDate: data.member.callDate, dnd: data.member.dnd };
            })
        } else if (reportType === 'Expiring' && subscriptionType === 'Package' && packageClass && packageClass !== 'All') {
            const vendorPackageActiveData = await VendorPackageSubscription.find({ $and: [{ packageInfo: { $eq: packageClass } }, { renewalDate: { $gte: new Date() } }, { renewalDate: { $lte: (new Date().getTime() + (req.body.expiringIn * 86400000)) } }, { packActivation: { $lte: new Date() } }, { freeze: { $eq: 0 } }] }).populate('member');
            reportsData = vendorPackageActiveData.map(async (data) => {
                const memberTransactionData = await Transaction.find({ member: data.member._id });
                let totalCredit = 0;
                let totalDebit = 0;
                memberTransactionData.map(async (transData) => {
                    if (transData.transactionStatus === 'Debit') {
                        totalDebit = totalDebit + transData.amount
                    } else {
                        totalCredit = totalCredit + transData.amount
                    }
                })
                let age = getAge(data.member.dob);
                let contactValue = data.member.alternativeContact ? `${data.member.contact},${data.member.alternativeContact}` : data.member.contact;
                return { memberId: data.member._id, form: data.member.regNo, member: `${data.member.name} ${data.member.fTitle} ${data.member.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.member.bloodGroup, fingercode: data.member.fingerCode, birthWish: data.member.birthWish, anniversaryWish: data.member.anniversaryWish, dob: data.member.dob, anniversary: data.member.anniversary, callDate: data.member.callDate, dnd: data.member.dnd };
            })
        } else if (reportType === 'Expiring' && subscriptionType === 'All') {
            const classSubscriptionActiveData = await ClassSubscription.find({ $and: [{ renewalDate: { $gte: new Date() } }, { renewalDate: { $lte: (new Date().getTime() + (req.body.expiringIn * 86400000)) } }, { classActivation: { $lte: new Date() } }, { freeze: { $eq: 0 } }] }).populate('member');
            let classReportsData = classSubscriptionActiveData.map(async (data) => {
                const memberTransactionData = await Transaction.find({ member: data.member._id });
                let totalCredit = 0;
                let totalDebit = 0;
                memberTransactionData.map(async (transData) => {
                    if (transData.transactionStatus === 'Debit') {
                        totalDebit = totalDebit + transData.amount
                    } else {
                        totalCredit = totalCredit + transData.amount
                    }
                })
                let age = getAge(data.member.dob);
                let contactValue = data.member.alternativeContact ? `${data.member.contact},${data.member.alternativeContact}` : data.member.contact;
                return { memberId: data.member._id, form: data.member.regNo, member: `${data.member.name} ${data.member.fTitle} ${data.member.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.member.bloodGroup, fingercode: data.member.fingerCode, birthWish: data.member.birthWish, anniversaryWish: data.member.anniversaryWish, dob: data.member.dob, anniversary: data.member.anniversary, callDate: data.member.callDate, dnd: data.member.dnd };
            })
            const vendorPackageActiveData = await VendorPackageSubscription.find({ $and: [{ renewalDate: { $gte: new Date() } }, { renewalDate: { $lte: (new Date().getTime() + (req.body.expiringIn * 86400000)) } }, { packActivation: { $lte: new Date() } }, { freeze: { $eq: 0 } }] }).populate('member');
            let packageReportsData = vendorPackageActiveData.map(async (data) => {
                const memberTransactionData = await Transaction.find({ member: data.member._id });
                let totalCredit = 0;
                let totalDebit = 0;
                memberTransactionData.map(async (transData) => {
                    if (transData.transactionStatus === 'Debit') {
                        totalDebit = totalDebit + transData.amount
                    } else {
                        totalCredit = totalCredit + transData.amount
                    }
                })
                let age = getAge(data.member.dob);
                let contactValue = data.member.alternativeContact ? `${data.member.contact},${data.member.alternativeContact}` : data.member.contact;
                return { memberId: data.member._id, form: data.member.regNo, member: `${data.member.name} ${data.member.fTitle} ${data.member.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.member.bloodGroup, fingercode: data.member.fingerCode, birthWish: data.member.birthWish, anniversaryWish: data.member.anniversaryWish, dob: data.member.dob, anniversary: data.member.anniversary, callDate: data.member.callDate, dnd: data.member.dnd };
            })
            reportsData = [...classReportsData, ...packageReportsData];
        } else if (reportType === 'Expired' && subscriptionType === 'Class' && packageClass === 'All') {
            const classSubscriptionActiveData = await ClassSubscription.find({ $and: [{ renewalDate: { $lte: new Date() } }, { freeze: { $eq: 0 } }] }).populate({ path: 'member', match: { dnd: 0 } });
            reportsData = classSubscriptionActiveData.map(async (data) => {
                if (data.member) {
                    const memberTransactionData = await Transaction.find({ member: data.member._id });
                    let totalCredit = 0;
                    let totalDebit = 0;
                    memberTransactionData.map(async (transData) => {
                        if (transData.transactionStatus === 'Debit') {
                            totalDebit = totalDebit + transData.amount
                        } else {
                            totalCredit = totalCredit + transData.amount
                        }
                    })
                    let age = getAge(data.member.dob);
                    let contactValue = data.member.alternativeContact ? `${data.member.contact},${data.member.alternativeContact}` : data.member.contact;
                    return { memberId: data.member._id, form: data.member.regNo, member: `${data.member.name} ${data.member.fTitle} ${data.member.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.member.bloodGroup, fingercode: data.member.fingerCode, birthWish: data.member.birthWish, anniversaryWish: data.member.anniversaryWish, dob: data.member.dob, anniversary: data.member.anniversary, callDate: data.member.callDate, dnd: data.member.dnd };
                }
                return null;
            })
        } else if (reportType === 'Expired' && subscriptionType === 'Package' && packageClass === 'All') {
            const vendorPackageActiveData = await VendorPackageSubscription.find({ $and: [{ renewalDate: { $lte: new Date() } }, { freeze: { $eq: 0 } }] }).populate({ path: 'member', match: { dnd: 0 } });
            reportsData = vendorPackageActiveData.map(async (data) => {
                if (data.member) {
                    const memberTransactionData = await Transaction.find({ member: data.member._id });
                    let totalCredit = 0;
                    let totalDebit = 0;
                    memberTransactionData.map(async (transData) => {
                        if (transData.transactionStatus === 'Debit') {
                            totalDebit = totalDebit + transData.amount
                        } else {
                            totalCredit = totalCredit + transData.amount
                        }
                    })
                    let age = getAge(data.member.dob);
                    let contactValue = data.member.alternativeContact ? `${data.member.contact},${data.member.alternativeContact}` : data.member.contact;
                    return { memberId: data.member._id, form: data.member.regNo, member: `${data.member.name} ${data.member.fTitle} ${data.member.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.member.bloodGroup, fingercode: data.member.fingerCode, birthWish: data.member.birthWish, anniversaryWish: data.member.anniversaryWish, dob: data.member.dob, anniversary: data.member.anniversary, callDate: data.member.callDate, dnd: data.member.dnd };
                }
                return null;
            })
        } else if (reportType === 'Expired' && subscriptionType === 'Class' && packageClass && packageClass !== 'All') {
            const classSubscriptionActiveData = await ClassSubscription.find({ $and: [{ classInfo: { $eq: packageClass } }, { renewalDate: { $lte: new Date() } }, { freeze: { $eq: 0 } }] }).populate({ path: 'member', match: { dnd: 0 } });
            reportsData = classSubscriptionActiveData.map(async (data) => {
                if (data.member) {
                    const memberTransactionData = await Transaction.find({ member: data.member._id });
                    let totalCredit = 0;
                    let totalDebit = 0;
                    memberTransactionData.map(async (transData) => {
                        if (transData.transactionStatus === 'Debit') {
                            totalDebit = totalDebit + transData.amount
                        } else {
                            totalCredit = totalCredit + transData.amount
                        }
                    })
                    let age = getAge(data.member.dob);
                    let contactValue = data.member.alternativeContact ? `${data.member.contact},${data.member.alternativeContact}` : data.member.contact;
                    return { memberId: data.member._id, form: data.member.regNo, member: `${data.member.name} ${data.member.fTitle} ${data.member.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.member.bloodGroup, fingercode: data.member.fingerCode, birthWish: data.member.birthWish, anniversaryWish: data.member.anniversaryWish, dob: data.member.dob, anniversary: data.member.anniversary, callDate: data.member.callDate, dnd: data.member.dnd };
                }
                return null;
            })
        } else if (reportType === 'Expired' && subscriptionType === 'Package' && packageClass && packageClass !== 'All') {
            const vendorPackageActiveData = await VendorPackageSubscription.find({ $and: [{ packageInfo: { $eq: packageClass } }, { renewalDate: { $lte: new Date() } }, { freeze: { $eq: 0 } }] }).populate({ path: 'member', match: { dnd: 0 } });
            reportsData = vendorPackageActiveData.map(async (data) => {
                if (data.member) {
                    const memberTransactionData = await Transaction.find({ member: data.member._id });
                    let totalCredit = 0;
                    let totalDebit = 0;
                    memberTransactionData.map(async (transData) => {
                        if (transData.transactionStatus === 'Debit') {
                            totalDebit = totalDebit + transData.amount
                        } else {
                            totalCredit = totalCredit + transData.amount
                        }
                    })
                    let age = getAge(data.member.dob);
                    let contactValue = data.member.alternativeContact ? `${data.member.contact},${data.member.alternativeContact}` : data.member.contact;
                    return { memberId: data.member._id, form: data.member.regNo, member: `${data.member.name} ${data.member.fTitle} ${data.member.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.member.bloodGroup, fingercode: data.member.fingerCode, birthWish: data.member.birthWish, anniversaryWish: data.member.anniversaryWish, dob: data.member.dob, anniversary: data.member.anniversary, callDate: data.member.callDate, dnd: data.member.dnd };
                }
                return null;
            })
        } else if (reportType === 'Expired' && subscriptionType === 'All') {
            const classSubscriptionActiveData = await ClassSubscription.find({ $and: [{ renewalDate: { $lte: new Date() } }, { freeze: { $eq: 0 } }] }).populate({ path: 'member', match: { dnd: 0 } });
            let classReportsData = classSubscriptionActiveData.map(async (data) => {
                if (data.member) {
                    const memberTransactionData = await Transaction.find({ member: data.member._id });
                    let totalCredit = 0;
                    let totalDebit = 0;
                    memberTransactionData.map(async (transData) => {
                        if (transData.transactionStatus === 'Debit') {
                            totalDebit = totalDebit + transData.amount
                        } else {
                            totalCredit = totalCredit + transData.amount
                        }
                    })
                    let age = getAge(data.member.dob);
                    let contactValue = data.member.alternativeContact ? `${data.member.contact},${data.member.alternativeContact}` : data.member.contact;
                    return { memberId: data.member._id, form: data.member.regNo, member: `${data.member.name} ${data.member.fTitle} ${data.member.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.member.bloodGroup, fingercode: data.member.fingerCode, birthWish: data.member.birthWish, anniversaryWish: data.member.anniversaryWish, dob: data.member.dob, anniversary: data.member.anniversary, callDate: data.member.callDate, dnd: data.member.dnd };
                }
                return null;
            })
            const vendorPackageActiveData = await VendorPackageSubscription.find({ $and: [{ renewalDate: { $lte: new Date() } }, { freeze: { $eq: 0 } }] }).populate({ path: 'member', match: { dnd: 0 } });
            let packageReportsData = vendorPackageActiveData.map(async (data) => {
                if (data.member) {
                    const memberTransactionData = await Transaction.find({ member: data.member._id });
                    let totalCredit = 0;
                    let totalDebit = 0;
                    memberTransactionData.map(async (transData) => {
                        if (transData.transactionStatus === 'Debit') {
                            totalDebit = totalDebit + transData.amount
                        } else {
                            totalCredit = totalCredit + transData.amount
                        }
                    })
                    let age = getAge(data.member.dob);
                    let contactValue = data.member.alternativeContact ? `${data.member.contact},${data.member.alternativeContact}` : data.member.contact;
                    return { memberId: data.member._id, form: data.member.regNo, member: `${data.member.name} ${data.member.fTitle} ${data.member.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.member.bloodGroup, fingercode: data.member.fingerCode, birthWish: data.member.birthWish, anniversaryWish: data.member.anniversaryWish, dob: data.member.dob, anniversary: data.member.anniversary, callDate: data.member.callDate, dnd: data.member.dnd };
                }
                return null;
            })
            reportsData = [...classReportsData, ...packageReportsData];
        } else if (reportType === 'Non-Active' && subscriptionType === 'Class' && packageClass === 'All') {
            const classSubscriptionActiveData = await ClassSubscription.find({ $or: [{ $and: [{ renewalDate: { $lte: new Date() } }, { classActivation: { $lte: new Date() } }, { freeze: { $eq: 0 } }] }, { $and: [{ renewalDate: { $gte: new Date() } }, { classActivation: { $gte: new Date() } }, { freeze: { $eq: 0 } }] }] }).populate({ path: 'member', match: { dnd: 1 } });
            reportsData = classSubscriptionActiveData.map(async (data) => {
                if (data.member) {
                    const memberTransactionData = await Transaction.find({ member: data.member._id });
                    let totalCredit = 0;
                    let totalDebit = 0;
                    memberTransactionData.map(async (transData) => {
                        if (transData.transactionStatus === 'Debit') {
                            totalDebit = totalDebit + transData.amount
                        } else {
                            totalCredit = totalCredit + transData.amount
                        }
                    })
                    let age = getAge(data.member.dob);
                    let contactValue = data.member.alternativeContact ? `${data.member.contact},${data.member.alternativeContact}` : data.member.contact;
                    return { memberId: data.member._id, form: data.member.regNo, member: `${data.member.name} ${data.member.fTitle} ${data.member.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.member.bloodGroup, fingercode: data.member.fingerCode, birthWish: data.member.birthWish, anniversaryWish: data.member.anniversaryWish, dob: data.member.dob, anniversary: data.member.anniversary, callDate: data.member.callDate, dnd: data.member.dnd };
                }
                return null;
            })
        } else if (reportType === 'Non-Active' && subscriptionType === 'Package' && packageClass === 'All') {

            const vendorPackageActiveData = await VendorPackageSubscription.find({ $or: [{ $and: [{ renewalDate: { $lte: new Date() } }, { packActivation: { $lte: new Date() } }, { freeze: { $eq: 0 } }] }, { $and: [{ renewalDate: { $gte: new Date() } }, { packActivation: { $gte: new Date() } }, { freeze: { $eq: 0 } }] }] }).populate({ path: 'member', match: { dnd: 1 } });

            reportsData = vendorPackageActiveData.map(async (data) => {
                if (data.member) {
                    const memberTransactionData = await Transaction.find({ member: data.member._id });
                    let totalCredit = 0;
                    let totalDebit = 0;
                    memberTransactionData.map(async (transData) => {
                        if (transData.transactionStatus === 'Debit') {
                            totalDebit = totalDebit + transData.amount
                        } else {
                            totalCredit = totalCredit + transData.amount
                        }
                    })
                    let age = getAge(data.member.dob);
                    let contactValue = data.member.alternativeContact ? `${data.member.contact},${data.member.alternativeContact}` : data.member.contact;
                    return { memberId: data.member._id, form: data.member.regNo, member: `${data.member.name} ${data.member.fTitle} ${data.member.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.member.bloodGroup, fingercode: data.member.fingerCode, birthWish: data.member.birthWish, anniversaryWish: data.member.anniversaryWish, dob: data.member.dob, anniversary: data.member.anniversary, callDate: data.member.callDate, dnd: data.member.dnd };
                }
                return null;
            })
        } else if (reportType === 'Non-Active' && subscriptionType === 'Class' && packageClass && packageClass !== 'All') {
            const classSubscriptionActiveData = await ClassSubscription.find({ $or: [{ $and: [{ renewalDate: { $lte: new Date() } }, { classInfo: { $eq: packageClass } }, { classActivation: { $lte: new Date() } }, { freeze: { $eq: 0 } }] }, { $and: [{ renewalDate: { $gte: new Date() } }, { classActivation: { $gte: new Date() } }, { classInfo: { $eq: packageClass } }, { freeze: { $eq: 0 } }] }] }).populate({ path: 'member', match: { dnd: 1 } });
            reportsData = classSubscriptionActiveData.map(async (data) => {
                if (data.member) {
                    const memberTransactionData = await Transaction.find({ member: data.member._id });
                    let totalCredit = 0;
                    let totalDebit = 0;
                    memberTransactionData.map(async (transData) => {
                        if (transData.transactionStatus === 'Debit') {
                            totalDebit = totalDebit + transData.amount
                        } else {
                            totalCredit = totalCredit + transData.amount
                        }
                    })
                    let age = getAge(data.member.dob);
                    let contactValue = data.member.alternativeContact ? `${data.member.contact},${data.member.alternativeContact}` : data.member.contact;
                    return { memberId: data.member._id, form: data.member.regNo, member: `${data.member.name} ${data.member.fTitle} ${data.member.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.member.bloodGroup, fingercode: data.member.fingerCode, birthWish: data.member.birthWish, anniversaryWish: data.member.anniversaryWish, dob: data.member.dob, anniversary: data.member.anniversary, callDate: data.member.callDate, dnd: data.member.dnd };
                }
                return null;
            })
        } else if (reportType === 'Non-Active' && subscriptionType === 'Package' && packageClass && packageClass !== 'All') {
            const vendorPackageActiveData = await VendorPackageSubscription.find({ $or: [{ $and: [{ renewalDate: { $lte: new Date() } }, { packageInfo: { $eq: packageClass } }, { packActivation: { $lte: new Date() } }, { freeze: { $eq: 0 } }] }, { $and: [{ renewalDate: { $gte: new Date() } }, { packActivation: { $gte: new Date() } }, { packageInfo: { $eq: packageClass } }, { freeze: { $eq: 0 } }] }] }).populate({ path: 'member', match: { dnd: 1 } });
            reportsData = vendorPackageActiveData.map(async (data) => {
                if (data.member) {
                    const memberTransactionData = await Transaction.find({ member: data.member._id });
                    let totalCredit = 0;
                    let totalDebit = 0;
                    memberTransactionData.map(async (transData) => {
                        if (transData.transactionStatus === 'Debit') {
                            totalDebit = totalDebit + transData.amount
                        } else {
                            totalCredit = totalCredit + transData.amount
                        }
                    })
                    let age = getAge(data.member.dob);
                    let contactValue = data.member.alternativeContact ? `${data.member.contact},${data.member.alternativeContact}` : data.member.contact;
                    return { memberId: data.member._id, form: data.member.regNo, member: `${data.member.name} ${data.member.fTitle} ${data.member.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.member.bloodGroup, fingercode: data.member.fingerCode, birthWish: data.member.birthWish, anniversaryWish: data.member.anniversaryWish, dob: data.member.dob, anniversary: data.member.anniversary, callDate: data.member.callDate, dnd: data.member.dnd };
                }
                return null;
            })
        } else if (reportType === 'Non-Active' && subscriptionType === 'All') {
            const classSubscriptionActiveData = await ClassSubscription.find({ $or: [{ $and: [{ renewalDate: { $lte: new Date() } }, { classActivation: { $lte: new Date() } }, { freeze: { $eq: 0 } }] }, { $and: [{ renewalDate: { $gte: new Date() } }, { classActivation: { $gte: new Date() } }, { freeze: { $eq: 0 } }] }] }).populate({ path: 'member', match: { dnd: 1 } });
            let classReportsData = classSubscriptionActiveData.map(async (data) => {
                if (data.member) {
                    const memberTransactionData = await Transaction.find({ member: data.member._id });
                    let totalCredit = 0;
                    let totalDebit = 0;
                    memberTransactionData.map(async (transData) => {
                        if (transData.transactionStatus === 'Debit') {
                            totalDebit = totalDebit + transData.amount
                        } else {
                            totalCredit = totalCredit + transData.amount
                        }
                    })
                    let age = getAge(data.member.dob);
                    let contactValue = data.member.alternativeContact ? `${data.member.contact},${data.member.alternativeContact}` : data.member.contact;
                    return { memberId: data.member._id, form: data.member.regNo, member: `${data.member.name} ${data.member.fTitle} ${data.member.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.member.bloodGroup, fingercode: data.member.fingerCode, birthWish: data.member.birthWish, anniversaryWish: data.member.anniversaryWish, dob: data.member.dob, anniversary: data.member.anniversary, callDate: data.member.callDate, dnd: data.member.dnd };
                }
                return null;
            })
            const vendorPackageActiveData = await VendorPackageSubscription.find({ $or: [{ $and: [{ renewalDate: { $lte: new Date() } }, { packActivation: { $lte: new Date() } }, { freeze: { $eq: 0 } }] }, { $and: [{ renewalDate: { $gte: new Date() } }, { packActivation: { $gte: new Date() } }, { freeze: { $eq: 0 } }] }] }).populate({ path: 'member', match: { dnd: 1 } });
            let packageReportsData = vendorPackageActiveData.map(async (data) => {
                if (data.member) {
                    const memberTransactionData = await Transaction.find({ member: data.member._id });
                    let totalCredit = 0;
                    let totalDebit = 0;
                    memberTransactionData.map(async (transData) => {
                        if (transData.transactionStatus === 'Debit') {
                            totalDebit = totalDebit + transData.amount
                        } else {
                            totalCredit = totalCredit + transData.amount
                        }
                    })
                    let age = getAge(data.member.dob);
                    let contactValue = data.member.alternativeContact ? `${data.member.contact},${data.member.alternativeContact}` : data.member.contact;
                    return { memberId: data.member._id, form: data.member.regNo, member: `${data.member.name} ${data.member.fTitle} ${data.member.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.member.bloodGroup, fingercode: data.member.fingerCode, birthWish: data.member.birthWish, anniversaryWish: data.member.anniversaryWish, dob: data.member.dob, anniversary: data.member.anniversary, callDate: data.member.callDate, dnd: data.member.dnd };
                }
                return null;
            })
            reportsData = [...classReportsData, ...packageReportsData];
        }


        let report_data = await Promise.all(reportsData);

        //Remove duplicate record
        // let distinctData = [];
        // report_data.map((item) => {
        //     let duplicate = distinctData.find(data => data.form === item.form)
        //     if (!duplicate) {
        //         distinctData.push(item);
        //     }
        // })
        const finalReport = report_data.filter((item) => item)
        res.status(200).send(finalReport);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}



/**
 * 
 * @param {*} req 
 * @param {*} res
 * Expiring Memberships Report 
 */
const getExpiringMemberships = async (req, res) => {
    try {
        const PurposeSubscription = await switchConnection(req.user.newDbName, "PurposeSubscription");
        const Transaction = await switchConnection(req.user.newDbName, "Transaction");
        const AddMember = await switchConnection(req.user.newDbName, "AddMember");
        const activeMember = await AddMember.find({ status: 1 });
        let pendingPaymentData = activeMember.map(async (data) => {
            const memberTransactionData = await Transaction.find({ member: data._id });
            let totalCredit = 0;
            let totalDebit = 0;
            memberTransactionData.map(async (transData) => {
                if (transData.transactionStatus === 'Debit') {
                    totalDebit = totalDebit + transData.amount
                } else {
                    totalCredit = totalCredit + transData.amount
                }
            })
            if (true) {
                let age = getAge(data.dob);
                const purpose_data = await PurposeSubscription.find({ member: data._id });
                let contactValue = data.alternativeContact ? `${data.contact},${data.alternativeContact}` : data.contact;
                return { form: data.regNo, member: `${data.name} ${data.fTitle} ${data.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.bloodGroup, fingercode: data.fingerCode, purpose: purpose_data[0]['purposeName'] };
            }
        })
        let pending_payments = await Promise.all(pendingPaymentData);
        res.status(200).send(pending_payments);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}


/**
 * 
 * @param {*} req 
 * @param {*} res
 * Expired Members Report 
 */
const getExpiredMembers = async (req, res) => {
    try {
        const PurposeSubscription = await switchConnection(req.user.newDbName, "PurposeSubscription");
        const Transaction = await switchConnection(req.user.newDbName, "Transaction");
        const AddMember = await switchConnection(req.user.newDbName, "AddMember");
        const activeMember = await AddMember.find({ status: 1 });
        let pendingPaymentData = activeMember.map(async (data) => {
            const memberTransactionData = await Transaction.find({ member: data._id });
            let totalCredit = 0;
            let totalDebit = 0;
            memberTransactionData.map(async (transData) => {
                if (transData.transactionStatus === 'Debit') {
                    totalDebit = totalDebit + transData.amount
                } else {
                    totalCredit = totalCredit + transData.amount
                }
            })
            if (true) {
                let age = getAge(data.dob);
                const purpose_data = await PurposeSubscription.find({ member: data._id });
                let contactValue = data.alternativeContact ? `${data.contact},${data.alternativeContact}` : data.contact;
                return { form: data.regNo, member: `${data.name} ${data.fTitle} ${data.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.bloodGroup, fingercode: data.fingerCode, purpose: purpose_data[0]['purposeName'] };
            }
        })
        let pending_payments = await Promise.all(pendingPaymentData);
        res.status(200).send(pending_payments);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}


/**
 * 
 * @param {*} req 
 * @param {*} res
 * Non Active Members Report 
 */
const getNonActiveMembers = async (req, res) => {
    try {
        const PurposeSubscription = await switchConnection(req.user.newDbName, "PurposeSubscription");
        const Transaction = await switchConnection(req.user.newDbName, "Transaction");
        const AddMember = await switchConnection(req.user.newDbName, "AddMember");
        const activeMember = await AddMember.find({ status: 1 });
        let pendingPaymentData = activeMember.map(async (data) => {
            const memberTransactionData = await Transaction.find({ member: data._id });
            let totalCredit = 0;
            let totalDebit = 0;
            memberTransactionData.map(async (transData) => {
                if (transData.transactionStatus === 'Debit') {
                    totalDebit = totalDebit + transData.amount
                } else {
                    totalCredit = totalCredit + transData.amount
                }
            })
            if (true) {
                let age = getAge(data.dob);
                const purpose_data = await PurposeSubscription.find({ member: data._id });
                let contactValue = data.alternativeContact ? `${data.contact},${data.alternativeContact}` : data.contact;
                return { form: data.regNo, member: `${data.name} ${data.fTitle} ${data.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.bloodGroup, fingercode: data.fingerCode, purpose: purpose_data[0]['purposeName'] };
            }
        })
        let pending_payments = await Promise.all(pendingPaymentData);
        res.status(200).send(pending_payments);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}



/**
 * 
 * @param {*} req 
 * @param {*} res
 * Get Classes Report 
 */
const getClasses = async (req, res) => {
    try {
        const PurposeSubscription = await switchConnection(req.user.newDbName, "PurposeSubscription");
        const Transaction = await switchConnection(req.user.newDbName, "Transaction");
        const AddMember = await switchConnection(req.user.newDbName, "AddMember");
        const activeMember = await AddMember.find({ status: 1 });
        let pendingPaymentData = activeMember.map(async (data) => {
            const memberTransactionData = await Transaction.find({ member: data._id });
            let totalCredit = 0;
            let totalDebit = 0;
            memberTransactionData.map(async (transData) => {
                if (transData.transactionStatus === 'Debit') {
                    totalDebit = totalDebit + transData.amount
                } else {
                    totalCredit = totalCredit + transData.amount
                }
            })
            if (true) {
                let age = getAge(data.dob);
                const purpose_data = await PurposeSubscription.find({ member: data._id });
                let contactValue = data.alternativeContact ? `${data.contact},${data.alternativeContact}` : data.contact;
                return { form: data.regNo, member: `${data.name} ${data.fTitle} ${data.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.bloodGroup, fingercode: data.fingerCode, purpose: purpose_data[0]['purposeName'] };
            }
        })
        let pending_payments = await Promise.all(pendingPaymentData);
        res.status(200).send(pending_payments);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}


/**
 * 
 * @param {*} req 
 * @param {*} res
 * Get All New Registered Report 
 */
const getRegistration = async (req, res) => {
    try {
        const PurposeSubscription = await switchConnection(req.user.newDbName, "PurposeSubscription");
        const Transaction = await switchConnection(req.user.newDbName, "Transaction");
        const AddMember = await switchConnection(req.user.newDbName, "AddMember");

        const registertion_data = await AddMember.find({ $and: [{ registertionDate: { $gte: req.body.fromDate } }, { registertionDate: { $lte: req.body.toDate } }] });

        let registertionData = registertion_data.map(async (data) => {
            const memberTransactionData = await Transaction.find({ member: data._id });
            let totalCredit = 0;
            let totalDebit = 0;
            memberTransactionData.map(async (transData) => {
                if (transData.transactionStatus === 'Debit') {
                    totalDebit = totalDebit + transData.amount
                } else {
                    totalCredit = totalCredit + transData.amount
                }
            })
            if (true) {
                let age = getAge(data.dob);
                const purpose_data = await PurposeSubscription.findOne({ member: data._id });
                let contactValue = data.alternativeContact ? `${data.contact},${data.alternativeContact}` : data.contact;
                return { memberId: data._id, form: data.regNo, member: `${data.name} ${data.fTitle} ${data.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.bloodGroup, fingercode: data.fingerCode, regDate: data.registertionDate, purpose: purpose_data.purposeName };
            }
        })
        let registrationReport = await Promise.all(registertionData);
        res.status(200).send(registrationReport);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}


/**
 * 
 * @param {*} req 
 * @param {*} res
 * Get All Renewed Membership Report 
 */
const getRenewal = async (req, res) => {
    try {
        const PurposeSubscription = await switchConnection(req.user.newDbName, "PurposeSubscription");
        const Transaction = await switchConnection(req.user.newDbName, "Transaction");
        const VendorPackageSubscription = await switchConnection(req.user.newDbName, "VendorPackageSubscription");
        const ClassSubscription = await switchConnection(req.user.newDbName, "ClassSubscription");
        let renewalData = [];
        if (req.body.subscriptionType === 'Class') {
            const classData = await ClassSubscription.find({ $and: [{ purchaseDate: { $gte: req.body.fromDate } }, { purchaseDate: { $lte: req.body.toDate } }] }).populate('member');
            renewalData = [...renewalData, ...classData];
        } else if (req.body.subscriptionType === 'Package') {
            const packageData = await VendorPackageSubscription.find({ $and: [{ purchaseDate: { $gte: req.body.fromDate } }, { purchaseDate: { $lte: req.body.toDate } }] }).populate('member');
            renewalData = [...renewalData, ...packageData];
        } else {
            const classData = await ClassSubscription.find({ $and: [{ purchaseDate: { $gte: req.body.fromDate } }, { purchaseDate: { $lte: req.body.toDate } }] }).populate('member');
            const packageData = await VendorPackageSubscription.find({ $and: [{ purchaseDate: { $gte: req.body.fromDate } }, { purchaseDate: { $lte: req.body.toDate } }] }).populate('member');
            renewalData = [...renewalData, ...classData, ...packageData];
        }

        //Remove duplicate record
        let renewal_data = [];
        renewalData.map((item) => {
            let duplicate = renewal_data.find(data => data.member.regNo === item.member.regNo)
            if (!duplicate) {
                renewal_data.push(item);
            }
        })

        const report_data = renewal_data.map(async (data) => {
            const memberTransactionData = await Transaction.find({ member: data.member._id });
            let totalCredit = 0;
            let totalDebit = 0;
            memberTransactionData.map(async (transData) => {
                if (transData.transactionStatus === 'Debit') {
                    totalDebit = totalDebit + transData.amount
                } else {
                    totalCredit = totalCredit + transData.amount
                }
            })
            if (true) {
                let age = getAge(data.member.dob);
                const purpose_data = await PurposeSubscription.findOne({ member: data.member._id });
                let contactValue = data.member.alternativeContact ? `${data.member.contact},${data.member.alternativeContact}` : data.member.contact;
                return { memberId: data.member._id, form: data.member.regNo, member: `${data.member.name} ${data.member.fTitle} ${data.member.favourOf}`, contect: contactValue, age: age, balance: totalDebit - totalCredit, bloodG: data.member.bloodGroup, regDate: data.member.registertionDate, fingercode: data.member.fingerCode, purpose: purpose_data.purposeName };
            }
        })

        let renewalDataReport = await Promise.all(report_data);
        res.status(200).send(renewalDataReport);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}


const handleDnd = async (req, res) => {
    try {
        const AddMember = await switchConnection(req.user.newDbName, "AddMember");
        const addMember = await AddMember.findOne({ _id: req.params.memberId });
        let dnd = addMember.dnd === 1 ? 0 : 1;
        await AddMember.update({ _id: req.params.memberId }, { $set: { dnd: dnd } })
        res.status(200).send(true);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}


const handleCall = async (req, res) => {
    try {
        const AddMember = await switchConnection(req.user.newDbName, "AddMember");
        await AddMember.update({ _id: req.params.memberId }, { $set: { callDate: moment(new Date()).format('YYYY-MM-DD') } })
        res.status(200).send(true);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

module.exports = {
    getPendingPaymentsData,
    getReports,
    getExpiringMemberships,
    getExpiredMembers,
    getNonActiveMembers,
    getClasses,
    getRegistration,
    getRenewal,
    handleDnd,
    handleCall
};