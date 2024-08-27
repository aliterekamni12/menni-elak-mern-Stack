const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Post = require("../models/postModel");
const Donation = require("../models/donationModel");
const Project = require("../models/projectModel")
require("dotenv").config;


exports.adminValidation = async(req,res,next)=>{
    try{

        const token = req.headers.authorization.split(" ")[1];

        if(!token){
            return res.status(400).json({message: "you are not logged in, please log in"})
        }

        let decoded
        try{
            decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY)

        }catch(error){
            if(error.name === "JsonWebToken"){
                return res.status(400).json({message: "invalid token, please login again"})
            }
            else if(error.name === "TokenExpiredError"){
                return res.status(400).json({message: "your session was expired, please login again"})
            }
            
        }

        const currentUser =await  User.findById({_id:decoded.id});


        if(!currentUser){
            return res.status(400).json({message : "token holder does no longer exist"})
        }

        if(!currentUser.isAdmin){
            return res.status(400).json({message : "sorry you are not admin"})
        }

        req.user = currentUser;
        

        next();

    }catch(error){
        console.log(error);
        
    }
}

exports.getAllUsers = async(req,res)=>{
    try{    
        const users = await User.find().populate('posts');

        res.status(200).json(users)

    }catch(error){
        console.log(error);
        
    }
}

exports.deleteUser = async (req,res)=>{
    try{

        

        await User.findByIdAndDelete(req.params.userId);

        const donation = await Donation.findOneAndDelete({ author: req.params.userId});
        const post  = await Post.findOneAndDelete({author:req.params.userId})

        res.status(200).json({message: "user deleted successfuly"})

    }catch(error){
        console.log(error);
        
    }
}

exports.getAllNotAcceptedPost = async(req,res)=>{
    try {
        
        const posts = await Post.find({isAccepted:false});
        res.status(200).json(posts)

    } catch (error) {
        console.log(error);
        
    }
}

exports.acceptPost = async(req,res)=>{
    try {
        
        const post = await Post.findByIdAndUpdate(req.params.postId,{
            isAccepted: true
        },{new: true});
        if(!post){
            return res.status(400).json({mwssage: "post is not valid" })
        }
        post.save();

        res.status(200).json(post)

    } catch (error) {
        console.log(error);
        
    }
}

exports.donationAccepted = async(req,res)=>{
    try{

        

        const project = await Project.findById(req.params.projectId);
        if(!project){
            return res.status(400).json({message : "the project does no longer exist"});
        }

        const donation = await Donation.findByIdAndUpdate(req.params.donationId, {
            isAccepted: true
        },{new:true});
        if(!donation){
            return res.status(400).json({message: "the donation is invalid"})
        }

        


        const projectTotal = project.total + donation.donationValue;
        

        const editProject = await Project.findByIdAndUpdate({_id: req.params.projectId},{
            $set:{
            total :projectTotal 
        }
        },{new:true});


        res.status(200).json({message : "donation is accepted successfuly"})
        


    }catch(error){
        console.log(error);
        
    }
}