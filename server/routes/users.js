const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const multer = require('multer');
const Post = require("../models/Post.js");


const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Food_Images/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${file.mimetype.split('/')[1]}`);
  }
});

const upload = multer({
  dest: 'Food_Images/',
  storage: storage,
  fileFilter: fileFilter
});

//--------------------------------------------------------------------------------------------------------------------------
//update
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updateUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });

      res.status(200).json(updateUser);
    } catch (err) {
      res.status(500).json("u missing somthing");
    }
  } else {
    res.status(401).json(".");
  }
});
//--------------------------------------------------------------------------------------------------------------------------
//GET USER:
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//upload an image
router.post('/images', upload.single('file'), (req, res) => {
  try {
    const imagePath = req.file;
    res.send(imagePath.filename);
  } catch (err) {
    console.log(err);
    res.send(null);
  }
});

// update post
router.patch("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.title = req.body.title;
    post.desc = req.body.desc;
    post.image = req.body.image;
    post.include = req.body.include;
    post.steps = req.body.steps;
    const savePost = await post.save();
    res.status(200).json(savePost);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
