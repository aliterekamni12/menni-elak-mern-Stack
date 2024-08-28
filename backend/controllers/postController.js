const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Post = require("../models/postModel")
require("dotenv").config;



exports.createPost = async(req,res)=>{
    try{


        const {title, description, amount} = req.body;

        const user = req.user

        const createPost = await Post.create({
            title, 
            description,
            amount,
            author: user
        })

        user.posts.push(createPost);

        await user.save()

        res.status(200).json({message: "post created successfuly"})

    }catch(error){
        console.log(error)
    }
}

exports.editPost= async(req,res)=>{
    try{



        if(JSON.stringify(req.user._id) !== JSON.stringify(req.post.author)){
            return res.status(400).json({message: "you are not able to edit this post"})
        }
        
        
        const editPost = await Post.findByIdAndUpdate(req.params.postId,{
            title : req.body.title,
            description: req.body.description,
            amount:req.body.amount
        },{new: true})

         await editPost.save();

        res.status(200).json(editPost)

    }catch(error){
        console.log(error)
    }

};

exports.identification = async(req,res,next)=>{
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

        const findPost = await Post.findOne({_id : req.params.postId})

        if(!currentUser){
            return res.status(400).json({message : "token holder does no longer exist"})
        }

        
        

        req.user = currentUser;
        req.post = findPost;

        next();

    }catch(error){
        console.log(error);
        
    }
}


exports.deletePost = async(req,res)=>{
    try{
        if(JSON.stringify(req.user._id) !== JSON.stringify(req.post.author)){
            return res.status(400).json({message: "you are not able to edit this post"})
        }

        const deletePost = await Post.findByIdAndDelete(req.params.postId);

        if(!deletePost){
            return res.status(404).json({message : "the post is not valid"})
        }

        res.status(200).json({message : "post deletet successfuly"})



    }catch(error){
        console.log(error);
        
    }
}

exports.getAllAcceptedPosts = async(req,res)=>{
    try{

        const posts = await Post.find({isAccepted:true});

        if(posts.length === 0){
            return res.status(200).json({message : "there are no post"})
        }

        res.status(200).json(posts)


    }catch(error){
        console.log(error);
        
    }
}

exports.getAcceptedPostById = async(req,res)=>{
    try{

        const posts = await Post.findOne({isAccepted: true, _id: req.params.postId });

        if(posts.length === 0){
            return res.status(200).json({message : "there are no post"})
        }

        res.status(200).json(posts)


    }catch(error){
        console.log(error);
        
    }
}