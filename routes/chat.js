import express from 'express'

import { getMessages, getMessage, creteMessage, updateMessage, deleteMessage, getMessagesCount, getUserChat } from '../controllers/chatController.js'

const router = express.Router()

//get all Messages
router.get('/', getMessages)

//get single Message
router.get('/:id', getMessage)

//create a Message
router.post('/', creteMessage)

//update a Message
router.put('/:id', updateMessage)

//delete a Message
router.delete('/:id', deleteMessage)

router.get('/get/count', getMessagesCount)

// get a user's all msgs
router.get('/user/:id', getUserChat)

export default router