import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import PostDetail from "./pages/PostDetail";
import EditPost from "./pages/EditPost";
import Login from "./pages/Login";
import Register from "./pages/Register";
import api from "./api";

function App() {
  // ✅ Safe user loader to avoid JSON parse errors
  const getStoredUser = () => {
    try {
      const stored = localStorage.getItem("user");
      if (!stored || stored === "undefined" || stored === "null") return null;
      return JSON.parse(stored);
    } catch (err) {
      console.error("Failed to parse stored user:", err);
      return null;
    }
  };

  const [user, setUser] = useState(getStoredUser());
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="container mx-auto flex justify-between items-center py-4 px-6">
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600 hover:text-blue-700"
            >
              React Blog
            </Link>

            <div className="flex gap-4 items-center">
              {user ? (
                <>
                  <Link
                    to="/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
                  >
                    + New Post
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-red-600 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Home posts={posts} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />

            {user && (
              <>
                <Route
                  path="/new"
                  element={<NewPost refreshPosts={fetchPosts} />}
                />
                <Route
                  path="/edit/:id"
                  element={<EditPost refreshPosts={fetchPosts} />}
                />
              </>
            )}

            <Route
              path="/post/:id"
              element={<PostDetail refreshPosts={fetchPosts} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
