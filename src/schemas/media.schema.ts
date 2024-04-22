const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true,
    },
    mediaUrl: {
        type: String,
        trim: true,
    },
    filename: {
        type: String,
        trim: true,
    },
    filePath: {
        type: String,
        trim: true,
    },
    liked: {
        type: Boolean,
        default: false
    }
    
}, {timestamps: true})


export const Media = mongoose.model('MyMedias', MediaSchema)