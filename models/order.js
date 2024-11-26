import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true,
    }],

    shipingAddress: {
        type: String,
        required: true
    },
    shipingAddress2: {
        type: String,
    },
    city: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    totalprice: {
        type: Number,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    orderedDate: {
        type: Date,
        default: Date.now
    }
})


orderSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

orderSchema.set('toJSON', {
    virtuals: true
})

const Order = mongoose.model('Order', orderSchema)

export default Order