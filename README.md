# repplit-for-good-backend
🛠️ Reddit Help Backend

This is the Express + MongoDB backend for the Reddit Help Map project.
It fetches posts from Reddit (via Reddit API), stores them in MongoDB, and exposes an API that the frontend can consume and display on a live interactive map.

🚀 Features

Fetches posts from Reddit (based on keywords / subreddits).

Normalizes data with title, text, URL, and geo-coordinates.

Stores posts in MongoDB for persistence.

Provides a REST API (/api/posts) for the frontend (React + Leaflet map).

📦 Tech Stack

Node.js + Express (server framework)

MongoDB Atlas (cloud database)

Axios (for fetching Reddit data)

dotenv (for environment variables)

⚙️ Installation & Setup (Local)

Clone the repo

git clone https://github.com/your-username/reddit-help-backend.git
cd reddit-help-backend


Install dependencies

npm install


Create a .env file

PORT=5000
MONGO_URL=your_mongodb_connection_string
REDDIT_CLIENT_ID=your_reddit_app_client_id
REDDIT_SECRET=your_reddit_app_secret
REDDIT_USER_AGENT=your_custom_agent_name


⚠️ You’ll need a free Reddit API app
 and MongoDB Atlas
 cluster.

Run the server

npm run dev   # if using nodemon
# or
node src/server.js


Test the API
Open http://localhost:5000/api/posts
 in your browser or Postman.
You should see a JSON list of posts.

🌍 Deployment (Hackathon Friendly)
🟢 Backend (Express)

Use Render
 (free tier).

Connect your GitHub repo → select Web Service.

Set:

Build Command: npm install

Start Command: node src/server.js

Add environment variables in Render dashboard.

You’ll get a live API URL like:

https://reddit-help-backend.onrender.com/api/posts

🟢 Database (MongoDB)

Use MongoDB Atlas
.

Whitelist all IPs (0.0.0.0/0).

Copy the connection string into your MONGO_URL.

📡 API Endpoints
Method	Endpoint	Description
GET	/api/posts	Get all stored posts

Sample response:

[
  {
    "title": "Need groceries in Delhi",
    "text": "Can someone help with food delivery?",
    "url": "https://reddit.com/r/example/post123",
    "lat": 28.7041,
    "lng": 77.1025
  }
]

📸 Demo Flow

Backend fetches Reddit posts.

Stores them in MongoDB.

Frontend (React + Leaflet) calls /api/posts.

Users see categorized markers on an interactive map.