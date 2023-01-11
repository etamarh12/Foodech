const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post.js");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newuser = new User({
      username: req.body.username,
      password: hashedPass,
      email: req.body.email,
    });
    const user = await newuser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const validate = await bcrypt.compare(req.body.password, user.password);
    if (!user || !validate) {
      res.status(500).json({
        error: "Wrong username or password"
      });
    } else {
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    }
  } catch (err) {
    res.status(500);
    console.log("error in login");
  }
});

module.exports = router;
