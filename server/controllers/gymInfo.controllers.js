import GymInfo from '../models/gymInfo.model'
import { gymInfoField } from '../constant/fieldFilter'


export const saveGymInfo = (req,res) => {
    const gymInfo = gymInfoField(req.body);
    console.log('gymInfo----in save gym info---', GymInfo)
    res.send(gymInfo);
}