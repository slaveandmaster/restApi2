const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

const { userLogin, tokenRefresh } = require("../middleware/auth");
dotenv.config();

router.post("/login", userLogin, async (req, res) => {
  res.json({
    message: "Successfully Login",
    content: req.content,
    JWT: req.token,
    refresh: req.refreshToken,
  });
});

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).send({ message: "Username already exists" });
    }

    const addNewUser = new User({
      email,
      isAdmin: false,
      hashedPassword: await bcrypt.hash(password, 10),
    });
    await addNewUser.save();
    res.status(201).send({ message: addNewUser });
  } catch (error) {
    res.status(500).send({
      status: 500,
      error: error.message,
    });
  }
});
router.post("/refresh", tokenRefresh, async (req, res) => {
  res.json({
    message: "Refresh Token",
    content: req.content,
    JWT: req.token,
    refresh: req.refreshToken,
  });
});
module.exports = router;
