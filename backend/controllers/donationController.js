const Project = require("../models/projectModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config;
const sendMail = require("../helpers/email").sendMail;
const Donation = require("../models/donationModel");






exports.userDonate = async(req,res)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        
        
        if(!token){
            return res.status(400).json({message : "there is no token, please log in"});

        }

        let decoded;
        
        decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

        if(!decoded){
            return res.status(400).json({message : "token seesion has expired, please log in again"})
        }
            
        const currentUser = await User.findOne({_id: decoded.id});

        if(!currentUser){
            return res.status(400).json({message: "the token holder, does no longer exist"})
        }

        const project = await Project.findOne({_id: req.params.projectId});

        if(!project){
            return res.status(404).json({message: "project not found"})
        }



        let donationEffort;
        if(project.category === "food"){
             donationEffort = "provide food to those in need";
        }else if(project.category === "clothes"){
            donationEffort = "provide clothes to those in need";
        }else {
            donationEffort = "build a water wells";
        }

        const amount = req.body.donation;
        
        let donationPayment;
        if(req.body.paymentMethod === "Western Union" ){
            donationPayment = `To proceed with your donation, you can send the amount of ${amount} via Western Union using the following details:

             Recipient Name: Omar Salim Ayach
             Country: Lebanon
             City: Tripoli

             After completing the transfer, please provide the following details:

             The Money Transfer Control Number (MTCN)
             The exact amount sent
             The sender’s full name as provided to Western Union
             These details will help us confirm and process your donation.`
        }else if(req.body.paymentMethod === "OMT"){
            donationPayment = `To proceed with your donation, you can send the amount of ${amount} via OMT using the following details:

             Recipient Name: Omar Salim Ayach
             Country: Lebanon
             City: Tripoli

             After completing the transfer, please provide the following details:

             The Money Transfer Control Number (MTCN)
             The exact amount sent
             The sender’s full name as provided to OMT
             These details will help us confirm and process your donation.`
        }else if(req.body.paymentMethod === "WHISH"){
            donationPayment = `To proceed with your donation, you can send the amount of ${amount} via WHISH using the following details:

             Recipient Name: Omar Salim Ayach
             Recipient Number :76 591 351
             Country: Lebanon
             City: Tripoli

             After completing the transfer, please provide the following details:

             
             The exact amount sent
             The sender’s full name and phone number as provided to WHISH
             These details will help us confirm and process your donation.`
        }

        

        const message = `Dear ${currentUser.firstName},
        
        I hope this email finds you well.
        
        Thank you so much for your generous decision to support Menni Elak Team. Your contribution will make a significant impact on our efforts to ${donationEffort}.

        ${donationPayment}
        
        Thank you again for your kindness and generosity.
        Best regards,
        Menni Elak Team.
`

        try {
            await sendMail({
                email: currentUser.email,
                subject:"Your Donation Invoice from Menni Elak Team",
                message: message
            })
        } catch (error) {
            console.error(error);
            
        }


        const donation = await Donation.create({
            donationValue : amount,
            paymentMethod :req.body.paymentMethod,
            user: currentUser,
            project: project
        });
        try{
            currentUser.donations.push(donation);
            await currentUser.save();
        }catch(error){
            console.log(error);
            
        }

        res.status(200).json({message : "the invoice sent to your email", donation});


    }catch(error){
        console.log(error);
        
    }
}




// exports.donationAccepted = async(req,res)=>{
//     try{

//         const token = req.headers.authorization.split(" ")[1];

//         if(!token){
//             return res.status(400).json({message : "you are not logged in please login and try again"})
//         }

//         let decoded;

//         decoded = jwt.verify(token  , process.env.JWT_PRIVATE_KEY);

//         if(!decoded){
//             return res.status(400).json({message : "token seesion has expired, please log in again"})
//         }

//         const currentUser = await User.findOne({_id: decoded.id});

//         if(!currentUser){
//             return res.status(400).json({message :  "the token holder does no longer exist"})
//         }

//         if(!currentUser.isAdmin){
//             return res.status(400).json({message  : "you are not allowed to accept the donation, only admin who can accept the donation "})
//         }

//         const project = await Project.findById(req.params.projectId);
//         if(!project){
//             return res.status(400).json({message : "the project does no longer exist"});
//         }

//         const donation = await Donation.findByIdAndUpdate(req.params.donationId, {
//             isAccepted: true
//         },{new:true});
//         if(!donation){
//             return res.status(400).json({message: "the donation is invalid"})
//         }

        


//         const projectTotal = project.total + donation.donationValue;
        

//         const editProject = await Project.findByIdAndUpdate({_id: req.params.projectId},{
//             $set:{
//             total :projectTotal 
//         }
//         },{new:true});


//         res.status(200).json({message : "donation is accepted successfuly"})
        


//     }catch(error){
//         console.log(error);
        
//     }
// }