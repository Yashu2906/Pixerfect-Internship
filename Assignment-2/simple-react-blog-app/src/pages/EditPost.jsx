import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PostForm from "../Components/PostForm";
import api from "../api";

export default function EditPost({ refreshPosts }) {
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
      console.error("Error loading post:", err);
    }
  };

  const updatePost = async (updatedPost) => {
    try {
      await api.put(`/posts/${id}`, updatedPost);
      await refreshPosts();
      navigate(`/post/${id}`);
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <PostForm onSubmit={updatePost} initialData={post} />
    </div>
  );
}
