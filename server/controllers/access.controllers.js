import Access from '../models/access.model';

export const getAccessData = async (req, res) => {
    try {
        const accessData = await Access.find({ status: 1 });
        res.status(200).send(accessData);
    } catch (err) {
        console.log('error----', err)
        res.status(400).send(err);
    }
}

export const saveAccessData = async (req, res) => {
    try {
        const accessData = await Access.create(req.body);
        res.status(200).send(accessData);
    } catch (err) {
        console.log('error----', err)
        res.status(400).send(err);
    }
}