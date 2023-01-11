const mongoose = require("mongoose");
const PostsSchema = new mongoose.Schema({
  title: String,
  desc: String,
  image: {
    type: String,
    required: false,
  },

  username: String,
  include: String,
  steps: String,
});

module.exports = mongoose.model("Post", PostsSchema);
