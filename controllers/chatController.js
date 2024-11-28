import mongoose from 'mongoose'
import Message from '../models/message.js'

// @desc Get all messages
// @route GET /api/v1/messages
const getMessages = async (req, res, next) => {
    const messages = await Message.find({}).populate('sender', "id name email").populate('receiver', "id name email")

    if (!messages.length) {
        return res.status(404).json({ success: false, message: 'no messages found' })
    }

    return res.json({ success: true, data: messages })
}

// @desc Get message by id
// @route GET /api/v1/messages/:id
const getMessage = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ success: false, msg: 'not a valid chat id' })
    }

    const message = await Message.findOne({ _id: id })

    if (!message) {
        return res.status(404).json({ success: false, message: 'no message found with this id' })
    }

    return res.json({ success: true, data: message })
}
// @desc Get message by id
// @route GET /api/v1/chat/user/:id
const getUserChat = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ success: false, msg: 'not a valid user id' })
    }

    const messages = await Message.find({ sender: id }).populate('sender', "id name email").populate('receiver', "id name email")

    if (!messages.length) {
        return res.status(404).json({ success: false, messages: 'no messages by this user' })
    }

    return res.json({ success: true, data: messages })
}

// @desc Create a new category
// @route POST /api/v1/messages
const creteMessage = async (req, res, next) => {
    const { msg, sender, receiver } = req.body

    if (!msg || !sender) {
        return res.status(404).json({ success: false, msg: 'name is required to create a message' })
    }

    const newMessage = new Message({ msg, sender, receiver })
    await newMessage.save()

    if (!newMessage) {
        res.status(404).json({ success: false, message: 'the message cannot be created!' })
    }

    res.status(200).json({ success: true, data: newMessage })
}


// @desc update a message by id
// @route PUT /api/v1/messages/:id
const updateMessage = async (req, res, next) => {
    const { id } = req.params
    const { msg,sender,receiver } = req.body


    if(sender || receiver){
        return res.status(404).json({ success: false, msg: 'You can only edit the message !!' })
    }

    if(!mongoose.isValidObjectId(id)){
        return res.status(401).json({ success: false, msg: 'not a valid id..' })
    }

    const message = await Message.findOneAndUpdate({ _id: id }, { msg }, { new: true })

    if (!message) {
        return res.status(404).json({ success: false, msg: 'message with this id not found' })
    }

 

    res.status(201).json({ msg: 'message updated ', data: message })
}

// @desc delete a message by id
// @route DELETE /api/v1/messages/:id
const deleteMessage = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ success: false, msg: "invalid Id" })
    }

    const message = await Message.findOneAndDelete({ _id: id })
    console.log("message: ", message)

    if (!message) {
        return res.status(404).json({ success: true, message: `message not found` })
    }
    const messages = await Message.find({})
    res.status(200).json({ success: true, msg: `message deleted`, messages })
}

// @desc get messages total count
// @route GET /api/v1/messages/get/count
const getMessagesCount = async (req, res, next) => {
    const messages = await Message.countDocuments()
    res.status(200).json({ success: true, totalmessages: messages })
}

export { getMessages, getMessage, creteMessage, updateMessage, deleteMessage, getMessagesCount, getUserChat }