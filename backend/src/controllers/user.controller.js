import { User } from "../models/user.model.js";
import httpStatus from "http-status";
import bcrypt, { hash } from "bcrypt"
import crypto from "crypto";

const login = async (req,res) =>
{
    const {username, password} = req.body;

    try{
    if(!username || !password)
    {
        return res.status(400).json({message:"Please Enter UserName & Passowrd"});
    }

    const user = await User.findOne({username:username.trim()});
    if(!user)
    {
        return res.status(httpStatus.NOT_FOUND).json({message:"User Not Found"});
    }

     const isMatch = await bcrypt.compare(password, user.password);

   

    if(isMatch)
    {
        
        let token = crypto.randomBytes(20).toString("hex");
        user.token = token;
        await user.save();
        
        return res.status(httpStatus.OK).json({token:token});

    }
    else{
      return res.status(httpStatus.UNAUTHORIZED).json({message:"Wrong Username or Password"});   
    }
    }
    catch(e)
    {
       return res.status(500).json({message:`Something Went Wrong ${e}`});
    }

}
const register = async (req,res)=>
{
    console.log("Register handler called", req.body);
    const {username, name,password} = req.body;
    try{

        const existinguser = await User.findOne({username: username.trim()});
        
        if(existinguser)
                return res.status(httpStatus.FOUND).json({message:"User Already Exists"});
        
        const hashedpass = await bcrypt.hash(password,10);
        const newuser = new User({
            name:name.trim(),
            username:username.trim(),
            password: hashedpass
        })
        await newuser.save();
        res.status(httpStatus.CREATED).json({message:"User Registered"});

    }
    catch(e)
    {
        res.json({message:`Something Went Wrong: ${e}`});
    }
}

export {login,register};