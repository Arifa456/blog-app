// pages/admin.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.posts)) {
          setPosts(data.posts); // ✅ Correctly setting only the array
        } else {
          console.error("Unexpected API response:", data);
          setPosts([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
      });
  }, []);

  const handleDelete = async (slug) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/posts/${slug}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setPosts(posts.filter((post) => post.slug !== slug));
    } else {
      alert("Failed to delete post.");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "auto" }}>
      <h1>Admin Dashboard</h1>
      <button
        onClick={() => router.push("/admin/create")}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          background: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
        }}
      >
        + Create New Post
      </button>

      {posts.map((post) => (
        <div
          key={post._id}
          style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}
        >
          <h2>{post.title}</h2>
          <p>
            <strong>Slug:</strong> {post.slug}
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button onClick={() => router.push(`/admin/edit/${post.slug}`)}>Edit</button>
            <button onClick={() => handleDelete(post.slug)} style={{ color: "red" }}>
              Delete
            </button>
            <a href={`/post/${post.slug}`} target="_blank" rel="noreferrer">
              View
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
