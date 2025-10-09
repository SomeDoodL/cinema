import express from "express";
import Blog from "../models/blog.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import multer from "multer";

const router = express.Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ---------------------------
// 1️⃣ Public route - everyone can view blogs
// ---------------------------
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .select("title content image_path authorName createdAt"); // include only necessary fields
    res.json({ blogs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single blog by ID (public)
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).select("title content image_path authorName createdAt");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---------------------------
// 2️⃣ Admin-only routes
// ---------------------------

// Get blogs created by this admin
router.get("/admin/blogs", protect, isAdmin, async (req, res) => {
  try {
    const blogs = await Blog.find({ authorId: req.user._id }).sort({ createdAt: -1 });
    res.json({ blogs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new blog (admin only)
router.post("/admin/blogs", protect, isAdmin, upload.single("image"), async (req, res) => {
  try {
    const { title, content } = req.body;
    const imagePath = req.file?.filename || null;

    const blog = await Blog.create({
      title,
      content,
      image_path: imagePath,
      authorId: req.user._id,
      authorName: req.user.name,
    });

    res.status(201).json({ blog });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
