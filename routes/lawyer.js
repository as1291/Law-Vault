const router = require("express").Router();
// const Lawyer = require("../models/Lawyer");
const Lawyer = require("../models/Lawyer");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedLawyer = await Lawyer.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedLawyer);
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
      const lawyer = await Lawyer.findById(req.params.id);
      try {
        await Post.deleteMany({ username: lawyer.username });
        await Lawyer.findByIdAndDelete(req.params.id);
        res.status(200).json("Lawyer has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("Lawyer not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.params.id);
    const { password, ...others } = lawyer._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ALL USERS
router.get("/", async (req, res) => {
  const username = req.query.lawyer;
  const categories = req.query.categories;
  try {
    let posts;
    if (username) {
      posts = await Lawyer.find({ username });
    } else if (categories) {
      posts = await Lawyer.find({
        categories
          
        });
    
    } else {
      posts = await Lawyer.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;