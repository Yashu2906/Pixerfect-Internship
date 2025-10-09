import { Link } from "react-router-dom";

export default function PostList({ posts }) {
  if (posts.length === 0) {
    return (
      <p className="text-gray-500">No posts yet. Start by creating one!</p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-white rounded-lg shadow hover:shadow-lg transition p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
            <Link
              to={`/post/${post._id}`}
              className="hover:text-blue-600 transition"
            >
              {post.title}
            </Link>
          </h2>
          <p className="text-sm text-gray-500">by {post.author}</p>
        </div>
      ))}
    </div>
  );
}
