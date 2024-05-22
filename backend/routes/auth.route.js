import express from 'express'
const router = express.Router()
import { signup,signin,google,signout } from '../controllers/auth.controllers.js';
import User from '../model/user model.js';


router.post('/signup', signup);
router.post('/signin',signin)
router.post('/google',google)
router.get('/signout',signout)

export default router

