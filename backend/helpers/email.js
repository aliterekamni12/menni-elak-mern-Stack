//nodemailer give us the ability to send emails easily.

const nodemailer = require("nodemailer")

exports.sendMail = async(options)=>{
//we can add the try catch and we can't 

	try{
		const transporter = nodemailer.createTransport({
			host : 'smtp.gmail.com',
			port : 465 ,
			secure: true,
			auth:{
				user:'aliterekmani6@gmail.com',
				pass:'hexz zkcn ieri whrx'
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