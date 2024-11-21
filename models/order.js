import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    }

})

const Order = mongoose.model('Order', orderSchema)

export default Order