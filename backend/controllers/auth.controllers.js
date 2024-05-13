import User from '../model/user model.js'
import bcryptjs from 'bcrypt.js'

export const signup =async(req,res)=>{
    const {username,email,password} = req.body
    const hashedPassword = bcryptjs.hashsync(password,10)
    const newUser = new User({username,email,hashedPassword})
    try{
        await newUser.save()
    res.status(201).json({message:'user created successfully'})
    }catch(error){
        res.status(500).json(error.message)
    }
    

}