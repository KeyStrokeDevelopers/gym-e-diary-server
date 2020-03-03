const { fileDataFilter } = require('../constant/fieldFilter')
const { MEDIA_FIELD } = require('../constant')
const switchConnection = require('../databaseConnection/switchDb')
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const saveMediaData = async (req, res) => {
    try {
        const mediaData = fileDataFilter(req.body, MEDIA_FIELD);
        mediaData.image = req.file && req.file.filename;
        const Media = await switchConnection(req.user.newDbName, "Media");
        const media_data = await Media.create(mediaData);
        res.status(200).send(media_data);
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const getMediaData = async (req, res) => {
    try {
        const Media = await switchConnection(req.user.newDbName, "Media");
        const mediaData = await Media.find();
        res.status(200).send(mediaData);
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const updateMediaData = async (req, res) => {
    try {
        const Media = await switchConnection(req.user.newDbName, "Media");
        const isUpdated = await Media.update({ _id: req.body._id }, { $set: req.body })
        if (isUpdated) {
            let updatedMediaData = await Media.find();
            res.send(updatedMediaData);
            return;
        }
        throw new Error('Media data is not updated');
    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

const deleteMediaData = async (req, res) => {
    try {
        const Media = await switchConnection(req.user.newDbName, "Media");
        const isDelete = await Media.deleteOne({ _id: req.body.dataId })
        if (isDelete) {
            let updatedMediaData = await Media.find();
            res.send(updatedMediaData);
            return;
        }
        throw new Error('Media data is not deleted');

    } catch (err) {
        console.log('error--', err)
        res.status(400).send(err)
    }
}

module.exports = {
    saveMediaData,
    getMediaData,
    updateMediaData,
    deleteMediaData
};