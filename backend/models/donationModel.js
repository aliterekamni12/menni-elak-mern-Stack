const mongoose = require("mongoose");
const User = require("./userModel");
const Project = require("./projectModel");

const Schema  = mongoose.Schema;

const donationSchema = new Schema ({
    donationValue:{
        type:Number,
        required: true,
        trim:true,
    },
    paymentMethod: {
        type: String, 
        enum:["Western Union", "OMT", "WHISH"],
        required: true,
        trim: true
    },
    isAccepted:{
        type: Boolean,
        default: false,
    },
    user:[{
        type: Schema.Types.ObjectId,
        ref:"users"
    }],
    project:[{
        type: Schema.Types.ObjectId,
        ref:"projects"
    }],

},{
    timestamps: true
})

module.exports = mongoose.model("donations", donationSchema)