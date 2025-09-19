import { useNavigate } from "react-router-dom";
import PostForm from "../Components/PostForm";

export default function NewPost({ posts, setPosts }) {
  const navigate = useNavigate();

  const addPost = (post) => {
    setPosts([...posts, post]);
    navigate("/");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">New Post</h1>
      <PostForm onSubmit={addPost} />
    </div>
  );
}
