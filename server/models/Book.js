
import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  fileUrl: { type: String }, // if storing file links (S3 / Supabase storage / direct URL)
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Book", BookSchema);
