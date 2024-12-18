import mongoose from "mongoose";

const orderItemSchema = mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },

})

orderItemSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

orderItemSchema.set('toJSON', {
    virtuals: true
})

const OrderItem = mongoose.model('OrderItem', orderItemSchema)

export default OrderItem