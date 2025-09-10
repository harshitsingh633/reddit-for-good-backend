import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

async function getRedditToken() {
  const auth = Buffer.from(
    `${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_SECRET}`
  ).toString("base64");

  const res = await axios.post(
    "https://www.reddit.com/api/v1/access_token",
    new URLSearchParams({ grant_type: "client_credentials" }),
    {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": process.env.REDDIT_USER_AGENT,
      },
    }
  );

  return res.data.access_token;
}

export async function fetchRedditPosts(subreddit = "Assistance") {
  const token = await getRedditToken();

  const res = await axios.get(
    `https://oauth.reddit.com/r/${subreddit}/new?limit=5`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": process.env.REDDIT_USER_AGENT,
      },
    }
  );

  return res.data.data.children.map((p) => ({
    title: p.data.title,
    url: "https://reddit.com" + p.data.permalink,
    text: p.data.selftext,
    created: p.data.created_utc,
  }));
}

