// pages/api/posts/[slug].js
import dbConnect from "@/lib/db";
import Post from "@/models/Post";

export default async function handler(req, res) {
  const { slug } = req.query;
  await dbConnect();

  if (req.method === "GET") {
    const post = await Post.findOne({ slug });
    if (!post) return res.status(404).json({ message: "Post not found" });

    return res.status(200).json({
      title: post.title,
      content: post.content,
      slug: post.slug,
    });
  }

  if (req.method === "DELETE") {
    const deleted = await Post.findOneAndDelete({ slug });
    if (!deleted) return res.status(404).json({ message: "Post not found" });
    return res.status(200).json({ message: "Post deleted" });
  }

  if (req.method === "PUT") {
    const { title, content } = req.body;
    const updated = await Post.findOneAndUpdate(
      { slug },
      { title, content, updatedAt: new Date() },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Post not found" });
    return res.status(200).json({ message: "Post updated", post: updated });
  }

  res.setHeader("Allow", ["GET", "DELETE", "PUT"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
