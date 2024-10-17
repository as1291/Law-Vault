const router = require("express").Router();
const User = require("../models/Lawyer");
 const Cases = require("../models/Cases");

//CREATE POST
//
router.post("/", async (req, res) => {
  const newCase = new Cases(req.body);
  try {
    const savedCase = await newCase.save();
    res.status(200).json(savedCase);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const cases = await Cases.findById(req.params.id);
    if (cases.username === req.body.username) {
      try {
        const updatedCase = await   Cases.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedCase);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const cases = await Cases.findById(req.params.id);
    res.status(200).json(cases);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const sat= req.query.sat;
  try {
    let cases;
    if (username) {
      cases = await Cases.find({ username });
    } else if (sat) {
      cases = await Cases.find({
        sat,
      });
    } else {
      cases = await Cases.find();
    }
    res.status(200).json(cases);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;