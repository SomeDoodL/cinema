import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image_path: { type: String, default: null },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  authorName: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);
