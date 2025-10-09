import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

export default function PostDetail({ refreshPosts }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await api.get(`/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      console.error("Error fetching post:", err);
    }
  };

  const deletePost = async () => {
    try {
      await api.delete(`/posts/${id}`);
      await refreshPosts();
      navigate("/");
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  if (!post) {
    return <p className="text-red-500">Loading...</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{post.title}</h1>
      <p className="text-gray-500 mb-6">by {post.author}</p>
      <p className="text-gray-700 leading-relaxed">{post.content}</p>

      <div className="mt-6 flex gap-4">
        <Link
          to={`/edit/${id}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
          ✏️ Edit
        </Link>
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
