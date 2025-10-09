import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

export default function PostDetail({ refreshPosts }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await api.get(`/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      console.error("Error fetching post:", err);
      setMessage("Failed to load post details.");
    }
  };

  const deletePost = async () => {
    if (!token) {
      setMessage("⚠️ You must be logged in to delete a post.");
      return;
    }

    try {
      await api.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await refreshPosts();
      navigate("/");
    } catch (err) {
      console.error("Error deleting post:", err);
      setMessage("Failed to delete post. Please try again.");
    }
  };

  if (!post) {
    return <p className="text-gray-600">Loading...</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{post.title}</h1>
      <p className="text-gray-500 mb-6">
        by {post.author?.name || "Unknown Author"}
      </p>
      <p className="text-gray-700 leading-relaxed">{post.content}</p>

      {/* ✅ Message area for login warnings or errors */}
      {message && (
        <p className="text-red-500 mt-4 font-medium text-center">{message}</p>
      )}

      <div className="mt-6 flex gap-4">
        {/* ✅ Allow edit only if logged in */}
        {token ? (
          <Link
            to={`/edit/${id}`}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            ✏️ Edit
          </Link>
        ) : (
          <button
            onClick={() =>
              setMessage("⚠️ You must be logged in to edit this post.")
            }
            className="bg-yellow-400 text-white px-4 py-2 rounded cursor-not-allowed opacity-75"
          >
            ✏️ Edit
          </button>
        )}

        {/* ✅ Delete button checks for token before calling API */}
        <button
          onClick={deletePost}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
