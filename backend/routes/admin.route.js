import express from 'express'
const router = express.Router()
import {AdminLogin,getAllUsers,deleteUser,updateUser} from '../controllers/admin.controller.js'


router.post('/login', AdminLogin);
router.get('/users', getAllUsers)
router.delete('/deleteUser/:id',deleteUser)
router.put('/update/:id',updateUser)


export default router   