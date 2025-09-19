import { useParams, useNavigate } from "react-router-dom";
import PostForm from "../Components/PostForm";

export default function EditPost({ posts, setPosts }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts[id];

  if (!post) return <p>Post not found.</p>;

  const updatePost = (updatedPost) => {
    const newPosts = posts.map((p, i) =>
      i === parseInt(id) ? updatedPost : p
    );
    setPosts(newPosts);
    navigate(`/post/${id}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <PostForm onSubmit={updatePost} initialData={post} />
    </div>
  );
}
