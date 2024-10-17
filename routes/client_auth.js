const router = require("express").Router();
const User = require("../models/Clients");
const bcrypt = require("bcrypt");
 
//REGISTER
router.post("/register", async (req, res) => {
  try {

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      prof: req.body.prof,
      dob: req.body.dob,
      address: req.body.address,
      cases:req.body.cases,
      lawyers:req.body.lawyers,
     
      addhar:req.body.addhar,
      contact:req.body.contact,
      gender:req.body.gender,
      password: hashedPass,
    });
console.log(newUser);
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
  
    const user = await User.findOne({ username: req.body.username });
    console.log(user);
   
    !user && res.status(400).json("Wrong credentials!");
    console.log("sfjln")
    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials!");

    const { password, ...others } = await user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;