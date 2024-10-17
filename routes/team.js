const router = require("express").Router();
// const Team = require("../models/Team");
const Team = require("../models/Team");
// const Post = require("../models/Post");
const bcrypt = require("bcrypt");
//post
router.post("/", async (req, res) => {
  const newPost = new Team(req.body);
  try {
    const savedPost = await newPost.save();
    console.log(savedPost);
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
  // console.log(res);
});
//UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedTeam = await Team.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedTeam);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const Team = await Team.findById(req.params.id);
      try {
        await Post.deleteMany({ username: Team.username });
        await Team.findByIdAndDelete(req.params.id);
        res.status(200).json("Team has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("Team not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const Team = await Team.findById(req.params.id);
    const { password, ...others } = Team._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ALL USERS
router.get("/", async (req, res) => {
  const username = req.query.Team;
  const categories = req.query.categories;
  try {
    let posts;
    if (username) {
      posts = await Team.find({ username });
    } else if (categories) {
      posts = await Team.find({
        categories,
      });
    } else {
      posts = await Team.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
