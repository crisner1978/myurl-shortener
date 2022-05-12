import mongoose from "mongoose";

const shortURLSchema = new mongoose.Schema({
  short_url: String,
  original_url: String,
  suffix: String,
});


module.exports = mongoose.models.ShortURL || mongoose.model("ShortURL", shortURLSchema);