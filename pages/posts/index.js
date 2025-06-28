// pages/posts/index.js
import { useEffect, useState } from "react";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts || []))
      .catch((err) => console.error("Failed to load posts", err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>All Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={{ marginBottom: "1.5rem" }}>
            <h2>{post.title}</h2>
            <p><strong>Slug:</strong> {post.slug}</p>
            <a href={`/posts/${post.slug}`} style={{ color: "blue" }}>
              Read More
            </a>
          </div>
        ))
      )}
    </div>
  );
}
