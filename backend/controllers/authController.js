const User = require("../models/userModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
var sendMail = require("../helpers/email").sendMail;
const jwt = require("jsonwebtoken");
require("dotenv").config;
const crypto = require("crypto");
const {promisify} = require("util")

const signToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_PRIVATE_KEY,{
        expiresIn : process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user, statusCode, message, res)=>{
    const token = signToken(user._id);

    res.status(statusCode).json({
        status: "success",
        token,
        message: message,
        data:{
            user: user
        }
    })
}



exports.signup = async(req,res)=>{
    try {
        const user = await User.findOne({
            $or: [{email: req.body.email}, {username: req.body.username}]
        })

        if(user){
            return res.status(400).json({message : "email or username are exist"})
        }

        if(!validator.isEmail(req.body.email)){
            return res.status(404).json({message : "email are not valid"});
        }

        if(req.body.password !== req.body.confirmPassword){
            return res.status(401).json({message: "password and confirm Password are not match"})
        }

        const salt = await bcrypt.genSalt(12);
        const hashPassword =await bcrypt.hash(req.body.password, salt);

        const newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            password: hashPassword,
            role: req.body.role

        })

        let message = `welcome ${req.body.firstName}, your account created successfuly`;

        createSendToken(newUser, 201, message, res)


    } catch (error) {
        console.log(error);
        
    }
};

exports.logIn = async(req,res)=>{
    try {
        
        const user = await User.findOne({
            $or: [{email: req.body.email}, {username: req.body.username}]
        })

        if(!user){
            return res.status(400).json({message : "email or username are not valid"})
        }

        const checkPassword = await bcrypt.compare(req.body.password , user.password);

        if(!checkPassword){
            return res.status(401).json({message: "username or password are incorrect"})
        }

        let message = `Hello ${user.firstName}, you logged in your account`

        createSendToken(user, 200, message, res)

    } catch (error) {
        console.log(error);
        
    }
};

exports.updatePassword = async(req,res)=>{
    try {

        const user = await User.findById(req.params.userId);

        if(!user){
            return res.status(404).json({message: "user not found"})
        }

        
         
        if(await bcrypt.compare(req.body.password, user.password)){
            return res.status(401).json({message: "you can't put an old password"})
        }

        if(req.body.password !== req.body.confirmPassword){
            return res.status(400).json({message: "password and confirmpassword are not match"})
        }

        const salt = await bcrypt.genSalt(12);
        const hashPassword =await bcrypt.hash(req.body.password, salt);

        user.password = hashPassword;
        await user.save();

        let message = `Hello ${user.firstName}, your account password updated successfuly`

        createSendToken(user, 200, message, res)

    } catch (error) {
        console.log(error);
        
    }
}

exports.forgotPassword = async(req,res)=>{
    try{
        const user = await User.findOne({
            $or: [{email: req.body.email}, {username: req.body.username}]
        })

        if(!user){
            return res.status(400).json({message : "email or username are not valid"})
        }

        const resetToken = user.generatePasswordResetToken();
        await user.save({validationBeforesave: false})

        const url = `${req.protocol}://${req.get("host")}/api/auth/resetPassword/${resetToken}`;
        const message = `forgot your password, please change it using the following url ${url}/`;
        
        

        try {
            await sendMail({
                email: user.email,
                subject:"Reset your password(valid in 10 min)",
                message: message
            })
        } catch (error) {
            console.error(error)
            user.passwordResetToken = undefined;
            user.passwordResetTokenExpires = undefined,
            await user.save({validationBeforesave: false})
            
        }
        
        res.status(200).json({message: "password reset link sent to your email"})

    }catch (error) {
        console.log(error);
        
    }
}

exports.resetPassword = async(req,res)=>{
    try {
        
        const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

        const tokenHolder = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetTokenExpires :{$gt : Date.now()}
        })

        if(!tokenHolder){
            return res.status(401).json({message : "token is invalid or has expired"})
        }

        if(req.body.password !== req.body.confirmPassword){
            return res.status(401).json({message : "password and confirm password are not match"})
        }

        const salt = await bcrypt.genSalt(12);
        const hashPassword =await bcrypt.hash(req.body.password, salt);

        tokenHolder.password = hashPassword;
        tokenHolder.passwordResetToken =undefined;
        tokenHolder.passwordResetTokenExpires= undefined;
        await tokenHolder.save();

        createSendToken(tokenHolder, 200, "reset password successfuly", res)

    } catch (error) {
        console.log(error);
        
    }
};

exports.protect = async(req,res,next)=>{
    try {
        let token;
        if(req.params.authorization && req.params.authorization.startsWith("Bearer")){
            token = req.params.authorization.split(" ")[1]
        }

        if(!token.trim()){
            res.status(400).json({message: "you are not logged in"})
        }

        let decoded
        try{
            decoded = promisify(jwt.verify)(token, process.env.JWT_PRIVATE_KEY)

        }catch(error){
            if(error.name === "JsonWebToken"){
                return res.status(400).json({message: "invalid token, please login again"})
            }
            else if(error.name === "TokenExpiredError"){
                return res.status(400).json({message: "your session was expired, please login again"})
            }
            
        }

        const currentUser = await User.findOne(decoded.id);
        if(!currentUser){
            return res.status(400).json({message: "the token holder, does no longer exist"})
        }

        if(currentUser.passwordChangeAfterIssuingToken(decoded.iat)){
            return res.status(400).json({message: "you has been changed your password, please login again"})
        }
        req.user = currentUser;

        next();

    } catch (error) {
        console.log(error);
        
    }

    
}