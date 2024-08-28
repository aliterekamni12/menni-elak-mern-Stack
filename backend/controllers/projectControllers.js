const Project = require("../models/projectModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config;
const sendMail = require("../helpers/email").sendMail;
const Donation = require("../models/donationModel");

exports.getAllProject = async(req,res)=>{
    try{

        const projects = await Project.find();
        if(projects.length === 0){
            return res.status(200).json({message: "There is no Project "})
        }

        res.status(200).json(projects)

    }catch(error){
        console.log(error);
        
    }
}

exports.getProjectById = async (req,res)=>{
    try {
        
        const project = await Project.findById(req.params.projectId);

        if(!project){
            return res.status(404).json({message : "project not found"})
        }

        res.status(200).json(project)

    } catch (error) {
        console.log(error);
        
    }
}



exports.createProject = async(req,res)=>{
    try{

        const token = req.headers.authorization.split(" ")[1];
        
        
        if(!token){
            return res.status(400).json({message : "there is no token, please log in"});

        }

        let decoded
        
            decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
            
            

        

        const currentUser = await User.findOne({_id: decoded.id});

        if(!currentUser){
            return res.status(400).json({message: "the token holder, does no longer exist"})
        }


        if(!currentUser.isAdmin){
            return res.status(400).json({message: "you are not allowed yo add projects"})
        }

        const newProject = await Project.create({
            name: req.body.name,
            description: req.body.description,
            goal:req.body.goal,
            total: req.body.total,
            category: req.body.category
        })

        res.status(200).json(newProject)

    }catch(error){
        console.log(error);
    }
}

exports.editProject = async(req,res)=>{
    try{

        const authToken = req.headers.authorization.split(" ")[1];

        if(!authToken){
            return res.status(400).json({message: "you are not logged in, please log in"});

        }
         
        let decoded;

        decoded = jwt.verify(authToken, process.env.JWT_PRIVATE_KEY);

        const currentUser = await User.findOne({_id: decoded.id});
        if(!currentUser){
            return res.status(400).json({message : "the token holder, does no longer exist "})
        }

        if(!currentUser.isAdmin){
            return res.status(400).json({message : "you are not allowed to edit Project"})
        }

        const project = await Project.findByIdAndUpdate(req.params.projectId,{
            name: req.body.name,
            description: req.body.description,
            goal:req.body.goal,
            total: req.body.total,
            category: req.body.category
        },{new: true});

        if(!project){
            return res.status(400).json({message : "project does no longer exist"})
        }

        res.status(200).json(project)


    }catch(error){
        console.log(error)
    }
}

exports.deleteProject = async(req,res)=>{
    try{

        const authToken = req.headers.authorization.split(" ")[1];

        if(!authToken){
            return res.status(400).json({message: "you are not logged in, please log in"});

        }
         
        let decoded;

        decoded = jwt.verify(authToken, process.env.JWT_PRIVATE_KEY);

        const currentUser = await User.findOne({_id: decoded.id});
        if(!currentUser){
            return res.status(400).json({message : "the token holder, does no longer exist "})
        }

        if(!currentUser.isAdmin){
            return res.status(400).json({message : "you are not allowed to edit Project"})
        }

        const project = await Project.findByIdAndDelete(req.params.projectId)

        if(!project){
            return res.status(400).json({message : "project does no longer exist"})
        }

        res.status(200).json({message : "project deleted successfuly"})


    }catch(error){
        console.log(error)
    }
}