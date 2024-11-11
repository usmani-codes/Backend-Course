import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: [true, 'Email must be unique'],
        minLength: [5, 'Email must have 5 letters'],
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [3, "Password can't be less than 3 letters"],
        select: false
    },
    varified: {
        type: Boolean,
        default: false,
    },
    varificationCode: {
        type: Number,
        select: false
    },
    varificationCodeValidation: {
        type: Number,
        select: false
    },
    forgotPasswordCode: {
        type: Number,
        select: false
    },
    forgotPasswordCodeValidation: {
        type: Number,
        select: false
    }
}, {
    timestamps: true
})

export const userModel = mongoose.model('User', userSchema)

