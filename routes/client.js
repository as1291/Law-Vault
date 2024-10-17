const router = require("express").Router();
// const Client = require("../models/Client");
const Client = require("../models/Clients");
// const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedLawyer = await Client.findByIdAndUpdate(
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
      const Client = await Client.findById(req.params.id);
      try {
        await Post.deleteMany({ username: Client.username });
        await Client.findByIdAndDelete(req.params.id);
        res.status(200).json("Client has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("Client not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

//GET Client
router.get("/:id", async (req, res) => {
  try {
    console.log("calling")
    const Clients = await Client.findById(req.params.id);
    console.log(Clients)
    const { password, ...others } = Clients._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ALL Client
router.get("/", async (req, res) => {
  const username = req.query.Client;
//   const catName = req.query.categories;
  try {
    let posts;
    if (username) {
      posts = await Client.find({ username });
    // } else if (catName) {
    //     posts = await Cases.find({
    //       categories: {
    //         $in: [catName],
    //       },
    //     });
    //   }
    
    } else {
      posts = await Client.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;