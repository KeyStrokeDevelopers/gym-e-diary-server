import express from 'express'
import { checkAuth, userLogin, checkMaster } from '../auth'
import { getToken, getStaffData, saveStaffData, updateStaffData, deleteStaffData } from '../controllers/staff.controllers'
const router = express.Router()

router.post("/signIn", checkMaster, userLogin, getToken)

router.get('/', checkAuth, getStaffData);

router.post('/', checkAuth, saveStaffData);

router.put('/', checkAuth, updateStaffData);

router.delete('/', checkAuth, deleteStaffData);


module.exports = router