import User from '../model/user model.js'
import bcryptjs from 'bcryptjs'
import  {errorHandler} from '../utils/error.js'

export const signup =async(req,res,next)=>{
    const {username,email,password} = req.body
    console.log(req.body)
    const hashedPassword = bcryptjs.hashSync(password,10)
    const newUser = new User({username,email,hashedPassword})
    try{
        await newUser.save()
        console.log('hi')
    res.status(201).json({message:'user created successfully'})
    }catch(error){
        console.log(error)
        // next(error)
    }
    

}