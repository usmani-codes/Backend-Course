import mongoose from "mongoose";

const messSchema = mongoose.Schema({
    msg: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: '6747f2d389b61381b7624876' //place your admin's id as default
    },

})


messSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

messSchema.set('toJSON', {
    virtuals: true
})

const Message = mongoose.model('Message', messSchema)

export default Message