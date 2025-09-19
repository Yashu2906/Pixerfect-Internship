import { useState } from "react";

export default function PostForm({ onSubmit, initialData }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [content, setContent] = useState(initialData?.content || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, author, content });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white shadow-md rounded-lg p-6"
    >
      <div>
        <label className="block text-gray-700 font-medium mb-2">Title</label>
        <input
          type="text"
          placeholder="Enter post title"
          className="w-full border border-gray-300  focus:ring-blue-500 focus:border-blue-500 p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Author</label>
        <input
          type="text"
          placeholder="Enter author name"
          className="w-full border border-gray-300  focus:ring-blue-500 focus:border-blue-500 p-2 rounded"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2">Content</label>
        <textarea
          placeholder="Write your blog post..."
          className="w-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500 p-2 rounded"
          rows="6"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
      </div>

      <button
        className="bg-blue-600 text-white px-6 py-3  rounded-xl hover:bg-blue-700 transition"
        type="submit"
      >
        Save Post
      </button>
    </form>
  );
}
