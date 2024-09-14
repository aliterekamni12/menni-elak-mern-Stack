const mongoose = require("mongoose");
const crypto = require("crypto");
const { stringify } = require("querystring");

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    description:{
        type:String,
        required: true,
        trim: true,
        maxLength: 400,
    },
    goal:{
        type:Number,
        default: 0,
        required: true,
        trim: true
    },
    total:{
        type:Number,
        required:true,
        minLength: 0,
        trim:true
    },
    image:{
        type: String,
        required: true
    },
    isAchieved:{
        type:Boolean,
        default:false,
    },
    category:{
        type: String,
        enum:["food", "clothes", "water wells"],
        default:"",
        required: true,

    },

    
},{
    timestamps: true
});



module.exports = mongoose.model("projects", projectSchema);