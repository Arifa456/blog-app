// pages/posts/[slug].js

import dbConnect from "@/lib/db";
import Post from "@/models/Post";

export default function PostPage({ post }) {
  if (!post) return <p>Post not found</p>;

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "auto" }}>
      <h1>{post.title}</h1>
      <p><strong>Slug:</strong> {post.slug}</p>
      <p><strong>Created At:</strong> {post.createdAt}</p>
      <p><strong>Last Updated:</strong> {post.updatedAt}</p>
      <div
        dangerouslySetInnerHTML={{ __html: post.content }}
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          borderRadius: "4px",
          marginTop: "1rem"
        }}
      />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  await dbConnect();

  const post = await Post.findOne({ slug: params.slug }).lean();

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: {
        ...post,
        _id: post._id.toString(),
        createdAt: new Date(post.createdAt).toLocaleString(),
        updatedAt: new Date(post.updatedAt).toLocaleString(),
      },
    },
  };
}
