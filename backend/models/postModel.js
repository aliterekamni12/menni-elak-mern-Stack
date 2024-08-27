const mongoose = require("mongoose");
const { trim } = require("validator");

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        minLength:5,
    },
    description:{
        type: String,
        required: true,
        trim:true,
        minLength:5,
    },
    amount:{
        type: Number,
        required:true,
        trim: true,
    },
    image:{
        type: String
    },
    author:{
        type: Schema.Types.ObjectId,
        ref:"users"
    },
    isAccepted:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("posts" , postSchema);