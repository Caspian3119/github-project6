const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//register

router.post("/register", async (req, res) => {
  try {
    //generate password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //create user
    const newUser = new User({
      username: req.body.username,
      password: hashPassword,
      email: req.body.email,
    });
    //save user
    const user = await newUser.save();
    res.status(200).json(user._id);
  } catch (err) {
    res.status(500).json(err);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    //find user
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong username or pasword");

    //validate password
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validatePassword && res.status(400).json("Wrong username or paswword");

    //send req
    res.status(200).json({ _id: user._id, username: user.username });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
