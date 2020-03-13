const switchConnection = require('../databaseConnection/switchDb');
const axios = require('axios');


const sendSms = async (req, res) => {
    try {
        const GymInfo = await switchConnection(req.user.newDbName, "GymInfo");
        const SmsLog = await switchConnection(req.user.newDbName, "SmsLog");
        const GymInfoData = await GymInfo.findOne();
        if (GymInfoData.smsBalance >= 1) {
            const messageResponse = await axios.post(`https://www.txtguru.in/imobile/api.php?username=keystrokedeveloperscom&password=95996826&source=GYMSMS&dmobile=91${req.body.contact}&message=${req.body.message}`);
            const smsLogData = {};
            smsLogData.msgId = messageResponse.data;
            smsLogData.sendTo = req.body.contact;
            smsLogData.smsBody = req.body.message;
            smsLogData.smsType = 'invoice';
            await SmsLog.create(smsLogData);
            await GymInfo.update({ _id: GymInfoData._id }, { $inc: { smsBalance: -1 } }, { new: true });
            res.status(200).send({ message: 'sms send successfully' })
            return null;
        } else {
            throw new Error('You have not sms balance');
        }
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

module.exports = {
    sendSms
};