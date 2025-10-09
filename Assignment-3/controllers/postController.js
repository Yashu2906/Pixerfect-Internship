const Post = require("../models/Post");

// ✅ Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const post = await Post.create({ title, content, author });
    res.status(201).json(post);
  } catch (error) {
    console.error("Create Post Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Get Posts Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Get posts by a specific user
exports.getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Get Posts By User Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Get single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    console.error("Get Post Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Update a post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    console.error("Update Post Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    console.error("Delete Post Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
