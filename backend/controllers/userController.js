const ErrorHandler = require("../utils/errorHandler");
const asyncCatchError = require("../middleware/asyncErrorCatch");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

exports.userRegistration = asyncCatchError(async (req, res, next) => {

    const { name, email, password } = req.body;
    console.log(name);
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is a publicid",
            url: "this is a url"
        }
    });

    sendToken(user,201,res);

});

exports.userLogin = asyncCatchError(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email and Password"))
    }

    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return next(new ErrorHandler(" Enter Valid Email or Password", 401))
    }

    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401))
    }

    sendToken(user,200,res);

})

exports.logoutUser = asyncCatchError(async(req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
})

exports.getUserDetails = asyncCatchError(async(req,res,next)=>{

    const user=await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user,
    })
})

exports.updateUserProfile = asyncCatchError(async(req,res,next)=>{
    const newUser={
        name:req.body.name,
        email:req.body.email
    }

    const user= await User.findByIdAndUpdate(req.user.id, newUser,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        
    })
})

exports.getAllUsers = asyncCatchError(async(req,res,next)=>{
     const users = await User.find()

     res.status(200).json({
         success:true,
         users
     })
})

exports.getOneUser = asyncCatchError(async(req,res,next)=>{
     
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`))
    }

    res.status(200).json({
        success:true,
        user
    })
})

exports.updateUserRole = asyncCatchError(async(req,res,next)=>{

    const newUserData ={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
        new: true,
        runValidators:true,
        useFindAndModify:false
    })

    if(!user){
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`,400))
    }

    res.status(200).json({
        success:true,
        user
    })
})

exports.deleteUser = asyncCatchError(async(req,res,next)=>{

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`,400))
    }

    await user.remove();

    res.status(200).json({
        success:true,
        message:"User Deleted Successfully"
    })
})