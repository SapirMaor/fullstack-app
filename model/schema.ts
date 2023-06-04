import mongoose, { Document, Model } from "mongoose";

const videoSchema: mongoose.Schema = new mongoose.Schema({
    user:{
        type: String,
        required: true,
    },
    dateUploaded:{
        type: String,
        required: true
    },
    postId:{
        type: String,
        required: true,
        unique: true        
    },
    videoLink:{
        type: String,
        required: true
    }
})

export interface IVideo extends Document {
    user: String;
    dateUploaded: String;
    postId: String;
    videoLink: String;
}

const Video: Model<IVideo> = mongoose.models.Video || mongoose.model('Video', videoSchema)

export default Video;
