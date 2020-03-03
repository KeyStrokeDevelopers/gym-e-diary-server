const switchConnection = require('../databaseConnection/switchDb');
const getAccessData = async (req, res) => {
    try {
        const Access = await switchConnection(req.user.newDbName, "Access");
        const accessData = await Access.find({ status: 1 });
        res.status(200).send(accessData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const saveAccessData = async (req, res) => {
    try {
        const Access = await switchConnection(req.user.newDbName, "Access");
        const accessData = await Access.create(req.body);
        res.status(200).send(accessData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

module.exports = {
    getAccessData,
    saveAccessData
};