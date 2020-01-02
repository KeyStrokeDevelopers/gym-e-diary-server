
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

export const saveGymInfo = async (req, res) => {

    //Todo

    try {
        res.status(200).send({ message: ' Need to be done gym info save controllers' })
    } catch (err) {
        console.log('errror--', err)
        res.status(400).send(err);
    }
}

// If error occour at any postion then remove database from master and all recored remove from db
// TODO