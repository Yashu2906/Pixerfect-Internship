import PostList from "../Components/PostList";

export default function Home({ posts }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      <PostList posts={posts} />
    </div>
  );
}
