import mongoose from "mongoose";

const { Schema } = mongoose;
const objectId = mongoose.Schema.Types.ObjectId;
const PostSchema = new Schema({
    title : String,
    url : String,
    text : String,
    location : String,
    lat : Number,
    lng : Number,
    created : {type : Date},
    subreddit : String,
    redditId : { type : String, unique : true}
})

const Post = mongoose.model('Post',PostSchema);
export default Post;