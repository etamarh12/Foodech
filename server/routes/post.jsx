const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post.js");

//---------------------------------------------------------------------------------------------------------------------
//CREATE A NEW POST
router.post("/", async (req, res) => {
  try {
  const newPost = new Post({
    username: req.body.username,
    title: req.body.title,
    desc: req.body.desc,
    image: req.body.image,
    include: req.body.include,
    steps: req.body.steps,
  });
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});
//-------------------------------------------------------------------------------------------------

//GET_POST:
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch("/", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const savePost = await post.save();
    res.status(200).json(savePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//------------------------------------------------------------------------------------------------

//GET ALL POSTS:
router.get("/", async (req, res) => {
  try {
    post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});
//--------------------------------------------------------------------------------



module.exports = router;
