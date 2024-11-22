import express from "express";

import { getUsers, getUser, createUser, updateUser, deleteUser, getUsersCount,login } from '../controllers/usersController.js'

const router = express.Router()

router.post('/login',login)

//get all Users
router.get('/', getUsers)

//get single User
router.get('/:id', getUser)

//create a User
router.post('/', createUser)

//update a User
router.put('/:id', updateUser)

//delete a User
router.delete('/:id', deleteUser)

router.get('/get/count', getUsersCount)


export default router