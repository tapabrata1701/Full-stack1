import asyncHandler from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js";
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res)=>
{
    // res.status(200).json({
    //     success: true,
    //     message: "Register route"
    // })

    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response

    const {fullName, username, email, password} = req.body
    //console.log("email: ",email)

    // if(fullName === ""){
    //     throw new apiError(400, "Fullname is required");
        
    // }
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new apiError(400, "All fields are required")
    }
    const existedUser = await User.findOne({
        $or:[{ username }, { email }]
    })

    if (existedUser) {
        throw new apiError(409, "User with email or username already exists")
    }
    
    console.log('Request Body:', req.body);  //req.*files* comes from multer
    console.log('Uploaded File:', req.file);  //showing undefined
    
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    //const avatarLocalPath = req.file?.path;  // Using req.file instead of req.files
    //const coverImageLocalPath = req.file?.path;  // Similarly, handle coverImage properly
    
    if(!avatarLocalPath){    //file is coming to multer middleware but not uploading to cloudinary
        throw new apiError(400, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new apiError(400, "Avatar file is required");
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })

    const createdUser = await user.findById(user._id).select(
        "-password -refreshToken"
    )
 
    if(!createdUser){
        throw new apiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new apiResponse(200, createdUser, "User registered successfully")
    )
})

export {registerUser}