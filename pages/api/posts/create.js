// pages/api/posts/create.js
import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import slugify from "slugify";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required." });
  }

  await dbConnect();

  const slug = slugify(title, { lower: true, strict: true });

  try {
    const newPost = new Post({ title, content, slug });
    await newPost.save();
    res.status(201).json({ message: "Post created", post: newPost });
  } catch (err) {
    res.status(500).json({ error: "Error creating post", details: err.message });
  }
}
