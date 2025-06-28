// pages/api/posts/index.js
import dbConnect from "@/lib/db";
import Post from "@/models/Post";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const posts = await Post.find({}).sort({ createdAt: -1 });
      res.status(200).json({ posts }); // ✅ Must return an object with 'posts'
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
