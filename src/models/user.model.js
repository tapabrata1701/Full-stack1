import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import {Video} from "./video.model.js";
import bcrypt from "bcrypt";
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index:true //better search optimisation
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    fullname:{
        type: String,
        required: true,
        trim: true,
        index:true
    },
    avatar:{
        type: String, //Cloudinary url
        required: true
    },
    covseImage:{
        type: String, //Cloudinary url
        required: true
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref: Video
        }
    ],
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken:{
        type: String
    }

},{timestamps: true});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) next();    //if password is not modified, skip this middleware
    
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.verifyPassword = async function(password){
    return await bcrypt.compare(password, this.password);  //returns true or false, comparing the password with the hashed password
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            username: this.username,
            email: this.email,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            username: this.username,
            email: this.email,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES
        }
    )
}

export const User = mongoose.model("User", userSchema);