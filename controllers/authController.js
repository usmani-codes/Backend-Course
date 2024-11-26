import mongoose from 'mongoose'
import bcypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { User } from '../models/user.js'

const login = async (req, res, next) => {

    const jwtSecret = process.env.JWT_SECRET

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

    res.status(201).json({ success: true, msg: "user logedIn successfully ", token })

}

const register = async (req, res, next) => {
    console.log('register')
    return res.status(200).json({ success: true, msg: 'register' })
}

export { login, register }