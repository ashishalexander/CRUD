import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String,requried:true,unique:true},
    email:{type:String,required:true,unique:true},
    hashedPassword:{type:String,required:true}
    
},{timestamps:true})

const User = mongoose.model('User',userSchema)
export default User