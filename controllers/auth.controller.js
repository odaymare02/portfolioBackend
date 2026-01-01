const User=require('../models/User');

const jwt=require("jsonwebtoken");

exports.register=async(req,res)=>{
    const{username,password}=req.body;
    const user=await User.create({username,password});
    return res.status(201).json(user);
};

exports.login=async(req,res)=>{
    const{username,password}=req.body;
    const user=await User.findOne({username});
    if(!user||!(await user.matchPassword(password)))
        return res.status(401).json({message:"Invalid credentials"});
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
    res.json({token});
}