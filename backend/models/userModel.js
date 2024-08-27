const mongoose = require("mongoose");
const crypto =require("crypto")
const Schema  = mongoose.Schema

const userSchema  = new Schema({
    firstName:{
        type:String,
        required: true,
        trim:true
    },
    lastName:{
        type:String,
        required: true,
        trim:true
    },
    email:{
        type:String,
        required: true,
        trim:true,
        minLength:5,
        maxLength: 50
    },
    username:{
        type:String,
        required: true,
        trim:true,
        maxLength:30
    },
    password:{
        type:String,
        required: true,
        trim:true,
        minLength:8
    },
    role:{
        type:String,
        required: true,
        trim:true,
        enum: ["donor" , "recipient"],
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "posts"
        }
    ],
    donations: [
        {
            type: Schema.Types.ObjectId,
            ref: "donations"
        }
    ],
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpires:Date,

},{
    timestamps: true,
});



userSchema.pre('save', async function(next){
    try {
        if(!this.isModified('password')) return next();
        this.passwordChangedAt = Date.now() -1000 ;
    } catch (error) {
        console.log(error);
        
    }
});

userSchema.methods.generatePasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex")

    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetTokenExpires = Date.now() + 10*60*1000;

    return resetToken
}

userSchema.methods.passwordChangeAfterIssuingToken = (JWTtimestamps)=>{
    if(this.passwordChangedAt){
        const passwordChangedTime = parseInt(this.passwordChangedAt.getTime()/1000,10);
        return passwordChangedTime > JWTtimestamps
    }
}
module.exports = mongoose.model("users" , userSchema);