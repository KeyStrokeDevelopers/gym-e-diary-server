// const switchConnection = require('../databaseConnection/switchDb');
// const { STAFF_INFO_FIELD } = require('../constant')
const send = require('gmail-send')({
    user: 'ksdandsk@gmail.com',
    pass: 'ksd@skelec',

});

const sendMail = async (req, res) => {
    try {
        await send({ to: `${req.body.mailId}`, subject: `${req.body.subject}`, text: `${req.body.invoice}` });
        res.status(200).send({});
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

module.exports = {
    sendMail
};