const Post = require("../models/Post");

// Create post
exports.createPost = async (req, res) => {
  try {
    const post = await Post.create({ ...req.body, author: req.body.author });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  const posts = await Post.find().populate("author", "name email");
  res.json(posts);
};

// Get posts by user
exports.getPostsByUser = async (req, res) => {
  const posts = await Post.find({ author: req.params.userId }).populate(
    "author",
    "name email"
  );
  res.json(posts);
};

// Get single post
exports.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id).populate(
    "author",
    "name email"
  );
  res.json(post);
};

// Update post
exports.updatePost = async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(post);
};

// Delete post
exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post deleted" });
};
