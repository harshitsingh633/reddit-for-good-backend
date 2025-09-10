import mongoose from "mongoose";

const { Schema } = mongoose;
const objectId = mongoose.Schema.Types.ObjectId;
const VolunteerSchema = new Schema({
    name : String,
    postId : objectId,
    contact : String
})