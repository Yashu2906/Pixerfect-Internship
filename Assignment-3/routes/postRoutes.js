const express = require("express");
const router = express.Router();
const {
  createPost,
  getPosts,
  getPostsByUser,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController");

router.post("/", createPost);
router.get("/", getPosts);
router.get("/user/:userId", getPostsByUser);
router.get("/:id", getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
