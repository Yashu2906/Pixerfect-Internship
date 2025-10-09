import { useNavigate } from "react-router-dom";
import PostForm from "../Components/PostForm";
import api from "../api";

export default function NewPost({ refreshPosts }) {
  const navigate = useNavigate();

  const addPost = async (post) => {
    try {
      await api.post("/posts", post);
      await refreshPosts();
      navigate("/");
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">New Post</h1>
      <PostForm onSubmit={addPost} />
    </div>
  );
}
