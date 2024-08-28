//nodemailer give us the ability to send emails easily.

const nodemailer = require("nodemailer");
require("dotenv").config();

exports.sendMail = async(options)=>{
//we can add the try catch and we can't 

	try{
		const transporter = nodemailer.createTransport({
			host : process.env.EMAIL_HOST,
			port : process.env.EMAIL_PORT ,
			secure: true,
			auth:{
				user:process.env.EMAIL_USER,
				pass:process.env.EMAIL_PASSWORD
			}
			
		});
	
		 const mailOptions = {
			
		 	to: options.email,
		 	subject : options.subject,
		 	text: options.message
		 };

		 await transporter.sendMail(mailOptions).then(()=>{
			console.log('email sent');
			
		 }).catch(err=>{
			console.error(err);
			
		 })

		
		
	}catch(err){

		console.log(err);

	}

}