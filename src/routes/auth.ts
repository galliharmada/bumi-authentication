require('dotenv').config();
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({email})
        if(existingUser)
        {
            return res.status(409).json({message: 'email already registered'})
        }

        /** hash the password */
        const hash = await bcrypt.hash(password,10);

        /** create user  */
        const newUser  = new User({username: username, email: email, password: hash});
        await newUser.save();
        res.status(201).json({message: 'User created successfully'});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'}); 
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({email})
        if(!user)
        {
            return res.status(404).json({message: 'User not found'})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid)
        {
            return res.status(401).json({message: 'Invalid password'})
        }
        
        /** generate token send JWT for authentication */
        const secret = process.env.SECRET_KEY as string
        const token = jwt.sign({userId : user.id}, secret, { 'expiresIn':'1h'})
        res.status(200).json({
            token : token,
            user : user.email,
            expiresIn : '1h' 
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal server error'})
    }
})

export default router;