import express from "express";
import Blog from "../models/blog.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import multer from "multer";
import User from "../models/user.js";

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

// Promote user to admin
router.post("/promote/:id", protect, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = "admin";
    await user.save();

    res.json({ message: `${user.name} is now an admin`, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all blogs created by this admin
router.get("/blogs", protect, isAdmin, async (req, res) => {
  try {
    const blogs = await Blog.find({ authorId: req.user._id }).sort({ createdAt: -1 });
    res.json({ blogs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new blog
router.post("/blogs", protect, isAdmin, upload.single("image"), async (req, res) => {
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
