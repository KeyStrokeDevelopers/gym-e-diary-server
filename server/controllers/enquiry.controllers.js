const { dataFilter } = require('../constant/fieldFilter')
const { ENQUIRY_FIELD } = require('../constant')
const switchConnection = require('../databaseConnection/switchDb')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const saveEnquiryData = async (req, res) => {
    try {
        const Enquiry = await switchConnection(req.user.newDbName, "Enquiry");
        const EnquiryData = dataFilter(req.body, ENQUIRY_FIELD);
        const Enquiry_data = await Enquiry.create(EnquiryData);
        const enquiryData = await Enquiry.findOne({ _id: Enquiry_data._id }).populate('packageInfo').populate('purpose').populate('classInfo');
        res.status(200).send(enquiryData)
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const getEnquiryData = async (req, res) => {
    try {
        const Enquiry = await switchConnection(req.user.newDbName, "Enquiry");
        const EnquiryData = await Enquiry.find({ enqStatus: 'new' }).populate('packageInfo').populate('purpose').populate('classInfo');
        res.status(200).send(EnquiryData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}


const updateEnquiryData = async (req, res) => {
    try {
        const Enquiry = await switchConnection(req.user.newDbName, "Enquiry");
        const isUpdated = await Enquiry.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedEnquiryData = await Enquiry.find({ enqStatus: 'new' });
            res.send(updatedEnquiryData);
            return;
        }
        throw new Error('Enquiry data is not updated');
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

const deleteEnquiryData = async (req, res) => {
    try {
        const Enquiry = await switchConnection(req.user.newDbName, "Enquiry");
        const isDelete = await Enquiry.deleteOne({ _id: req.body.dataId })
        if (isDelete) {
            let updatedEnquiryData = await Enquiry.find({ enqStatus: 'new' });
            res.send(updatedEnquiryData);
            return;
        }
        throw new Error('Enquiry data is not deleted');

    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

module.exports = {
    saveEnquiryData,
    getEnquiryData,
    updateEnquiryData,
    deleteEnquiryData
};