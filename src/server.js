// backend/src/server.js
import express from "express";
import { fetchRedditPosts } from "./services/redditService.js";
import Post from "../src/models/Post.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo error:", err));

// ✅ Improved /api/posts route
app.get("/api/posts", async (req, res) => {
  try {
    // Fetch posts from Reddit
    const redditPosts = await fetchRedditPosts("Assistance");

    // Update DB with upsert (avoids duplicates)
    for (const post of redditPosts) {
      await Post.updateOne(
        { redditId: post.id },          // search by redditId
        {
          $set: {
            redditId: post.id,
            title: post.title,
            url: post.url,
            text: post.text,
            created: new Date(post.created * 1000),
            subreddit: "Assistance",
            lat : 28.6139,
            lng:77.2090
          }
        },
        { upsert: true }                 // insert if not found
      );
    }

    // Fetch posts with lat/lng for map
    const postsWithCoords = await Post.find({
      lat: { $exists: true, $ne: null },
      lng: { $exists: true, $ne: null }
    }).sort({ created: -1 });           // newest first

    
    res.json(postsWithCoords);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch or serve posts" });
  }
});

// Start server
app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
