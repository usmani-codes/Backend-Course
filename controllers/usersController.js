import mongoose from 'mongoose'
import bcypt from 'bcryptjs'

import { User } from '../models/user.js'


// @desc Get all users
// @route GET /api/v1/users
const getUsers = async (req, res, next) => {

    const users = await User.find({})

    console.log("users: ", users)

    if (!users.length) {
        return res.status(404).json({ success: false, message: 'no users found' })
    }

    res.status(200).json({ success: true, data: users })
}

// @desc Get user by id
// @route GET /api/v1/users/:id
const getUser = async (req, res, next) => {
    const { id } = req.params
    const isValidUser = mongoose.isValidObjectId(id)

    if (!isValidUser) {
        return res.status(400).json({ success: false, msg: 'not a valid id' })
    }

    const user = await User.findOne({ _id: id })

    if (!user) {
        return res.status(404).json({ success: false, message: 'no user found with this id' })
    }

    res.json({ success: true, data: user })
}


// @desc Create a new user
// @route POST /api/v1/users
const createUser = async (req, res, next) => {
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

    const newUser = new User({ name, email, hashedPassword, phone, isAdmin, street, apartment, city, zip, country })
    await newUser.save()


    if (!newUser) {
        res.status(400).json({ success: false, message: 'the user cannot be created!' })
    }


    newUser.hashedPassword = ''
    return res.status(201).json({ success: true, msg: "user creatd", data: newUser })
}



// @desc update a user by id
// @route PUT /api/v1/users/:id
const updateUser = async (req, res, next) => {
    const { id } = req.params
    const { name, email, password, phone, isAdmin, street, apartment, city, zip, country } = req.body

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ success: false, msg: 'not a valid id' })
    }

    //extra for now ...
    if (req.body.email || req.body.id) {
        return res.json({ success: false, msg: "can't change email for now" })
    }

    const user = await User.findOneAndUpdate({ _id: id }, { name, password, phone, isAdmin, street, apartment, city, zip, country }, { new: true })

    if (!user) {
        return res.status(404).json({ success: false, msg: 'user with this id not found' })
    }

    res.status(201).json({ msg: 'user updated ', data: user })
}



// @desc delete a user
// @route DELETE /api/v1/users/:id
const deleteUser = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ success: false, message: `not a valid id` })
    }

    const user = await User.findOneAndDelete({ _id: id })

    if (!user) {
        return res.status(404).json({ success: true, message: `user not found` })
    }
    const users = await User.find({})

    res.status(200).json({ success: true, message: `user deleted`, user: users })
}


// @desc get users total count
// @route GET /api/v1/users/get/count
const getUsersCount = async (req, res, next) => {
    const users = await User.countDocuments()
    res.status(200).json({ success: true, totalUsers: users })
}

export { getUsers, getUser, createUser, updateUser, deleteUser, getUsersCount }