import Staff from '../models/staff.model';
import GymInfo from '../models/gymInfo.model';
import Access from '../models/access.model';
import Subscription from '../models/subscription.model';
import { gymInfoField, accessLevelField, subscriptionField, staffInfoField } from '../constant/fieldFilter'


export const saveGymInfo = async(req,res) => {
    try {
         const gymInfo = gymInfoField(req.body);
        const accessLevel = accessLevelField(req.body);
        const subscription = subscriptionField(req.body);
        const staffInfo = staffInfoField(req.body);
        await GymInfo.save(gymInfo);
        await Access.save(accessLevel);
        await Subscription.save(subscription);
        await Staff.save(staffInfo);
        res.status(200).send({message:'Gym info save successfully'})
    } catch (err) {
        res.status(400).send(err);
    }
}