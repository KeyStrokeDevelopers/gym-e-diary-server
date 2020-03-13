const https = require('https');







const sendSms = async (req, res) => {
    try {
        let contact_num = 9466051803;
        let show_message = 'SMS Testing';

        var options = {
            hostname: `https://www.txtguru.in/imobile/api.php?username=keystrokedeveloperscom&password=95996826&source=GYMSMS&dmobile=91${contact_num}&message=${show_message}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': 2
            }
        };

        https.request(options, (res) => {
            console.log('res-----', res);
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);
        }).on('error', (e) => {
            console.log(e)
            //  throw new Error(e.message)
        });
        res.status(200).send({ message: 'sms send successfully' })
    } catch (err) {
        console.log('error--', err)
        res.status(400).json({ message: err.message })
    }
}

module.exports = {
    sendSms
};