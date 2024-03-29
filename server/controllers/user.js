import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from '../models/user.js';
dotenv.config();


export const signin = async (req,res)=>{
    const { email, password} = req.body;
    try{
        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({message:'User does not exist!'});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message:'Invalid Credentials! Please try again'});
        // test is just example crypting key that should be secured in env files
        const token = jwt.sign({email:existingUser.email, id:existingUser._id},process.env.SECRET_KEY,{expiresIn:"1h"})

        res.status(200).json({result:existingUser, token});

    }catch(error){
        res.status(500).json('Something went wrong! Server Error');
    }
};

export const signup = async (req,res)=>{
    const {email, password, confirmPassword, firstName, lastName} = req.body;
    try{

        const existingUser = await User.findOne({ email });

        if(existingUser) return res.status(400).json({message:'User exists! Please Sign In'});

        if(password.trim()!==confirmPassword.trim()) return res.status(400).json({message:"Passwords don't match"});

        const hashedPassword = await bcrypt.hash(password,12);

        const result = await User.create({ email, password:hashedPassword,name:`${firstName} ${lastName}`});

        const token = jwt.sign({email: result.email,id:result._id},process.env.SECRET_KEY,{expiresIn:"1h"})

        res.status(200).json({result,token})

    }catch(error){
        res.status(500).json('Something went wrong! Server Error');

    }
};
