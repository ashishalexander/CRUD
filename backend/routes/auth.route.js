import express from 'express'
const router = express.Router()
import { signup,signin,google } from '../controllers/auth.controllers.js';
import User from '../model/user model.js';


router.post('/signup', signup);
router.post('/signin',signin)
router.post('/google',google)

export default router

