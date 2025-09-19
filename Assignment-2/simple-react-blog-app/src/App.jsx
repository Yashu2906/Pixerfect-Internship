import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import PostDetail from "./pages/PostDetail";
import EditPost from "./pages/EditPost";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [posts, setPosts] = useLocalStorage("posts", []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <header className="bg-white shadow">
          <div className="container mx-auto flex justify-between items-center py-4 px-6">
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600 hover:text-blue-700"
            >
              React Blog
            </Link>
            <Link
              to="/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              + New Post
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Home posts={posts} />} />
            <Route
              path="/new"
              element={<NewPost posts={posts} setPosts={setPosts} />}
            />
            <Route
              path="/post/:id"
              element={<PostDetail posts={posts} setPosts={setPosts} />}
            />
            <Route
              path="/edit/:id"
              element={<EditPost posts={posts} setPosts={setPosts} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
