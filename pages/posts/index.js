import { useState } from "react";
import Link from "next/link";

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/posts");
  const data = await res.json();
  const posts = Array.isArray(data) ? data : data.posts || [];

  return { props: { posts } };
}

export default function AllPosts({ posts }) {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const allTags = [...new Set(posts.flatMap((post) => post.tags || []))];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h1>All Blog Posts</h1>

      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "0.5rem", width: "100%", marginBottom: "1rem" }}
      />

      <div style={{ marginBottom: "1rem" }}>
        <strong>Filter by tag: </strong>
        <button onClick={() => setSelectedTag("")}>All</button>
        {allTags.map((tag) => (
          <button key={tag} onClick={() => setSelectedTag(tag)} style={{ marginLeft: "1rem" }}>
            {tag}
          </button>
        ))}
      </div>

      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <div key={post._id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
            <h2>{post.title}</h2>
            <p><strong>Slug:</strong> {post.slug}</p>
            {post.tags?.length > 0 && (
              <p><strong>Tags:</strong> {post.tags.join(", ")}</p>
            )}
            <Link href={`/posts/${post.slug}`}>Read More</Link>
          </div>
        ))
      ) : (
        <p>No posts match your search.</p>
      )}
    </div>
  );
}
