
import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email must be unique'],
        trim: true,
        minLength: [5, 'Email must have 5 letters'],
        lowercase: true,
    },
    hashedPassword: {
        type: String,
        required: true,
        minLength: [3, "Password can't be less than 3 letters"],
        select: false
    },
    phone: {
        type: String,
        required:true
    },
    isAdmin: {
        type: Boolean,
        default:false
    },
    street: {
        type: String,
        default:''
    },
    apartment: {
        type: String,
        default:''
    },
    city: {
        type: String,
        default:''
    },
    zip: {
        type: String,
        default:''
    },
    country: {
        type: String,
        default:''
    },

}, {
    timestamps: true
})

userSchema.virtual('id').get(function(){
    return this._id.toHexString()
})

userSchema.set('toJSON',{
    virtuals:true
})

export const User = mongoose.model('User', userSchema)

