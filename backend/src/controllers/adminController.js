import Blog from "../models/blog.js";

export const getAdminBlogs = async (req, res) => {
  const blogs = await Blog.find({ authorId: req.user._id }).sort({ createdAt: -1 });
  res.json({ blogs });
};

export const createBlog = async (req, res) => {
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
};
