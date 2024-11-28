import mongoose from 'mongoose'
import bcypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { User } from '../models/user.js'

const jwtSecret = process.env.JWT_SECRET

const login = async (req, res, next) => {

    console.log("in login..")


    const { email, password } = req.body
    if (!email || !password) {
        return res.status(401).json({ success: false, msg: 'please provide all required fields' })
    }

    const user = await User.findOne({ email: email }).select("+hashedPassword")

    if (!user) {
        return res.status(404).json({ success: false, msg: 'user with this email not found' })
    }

    const passwordMatched = await bcypt.compare(password, user.hashedPassword)

    if (!passwordMatched) {
        return res.status(401).json({ success: false, msg: 'incorrect email or password' })
    }

    user.hashedPassword = ''

    const token = jwt.sign({ email, isAdmin: user.isAdmin }, jwtSecret, { expiresIn: '1d' })

    res.status(201).json({ success: true,userId:user.id, msg: "user logedIn successfully ", token })

}

const register = async (req, res, next) => {
    const { name, email, password, phone, isAdmin, street, apartment, city, zip, country } = req.body

    if (!name || !email || !password || !phone) {
        return res.status(400).json({ success: false, msg: 'please fill all required fields' })
    }

    const user = await User.findOne({ email: email })

    if (user) {
        return res.status(401).json({ success: false, message: 'the user already exists!' })
    }

    const hashedPassword = await bcypt.hash(password, 10)

    console.log("hashed: ", hashedPassword)

    let newUser = new User({ name, email, hashedPassword, phone, isAdmin, street, apartment, city, zip, country })
    await newUser.save()


    if (!newUser) {
        res.status(400).json({ success: false, message: 'the user cannot be created!' })
    }

    const token = jwt.sign({ email, isAdmin }, jwtSecret, { expiresIn: '1d' })

    // newUser.hashedPassword = ''
    // newUser = await User.findOne({email}).select("name email isAdmin")


    return res.status(201).json({ success: true, msg: "user creatd successfully",token, data: {name:newUser.name,email:newUser.email,isAdmin:newUser.isAdmin }})

}

export { login, register }