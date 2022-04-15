const router = require("express").Router();
const { verifyToken } = require("../middleware/auth");
const User = require("../models/User");
const Rent = require("../models/rent");
const Car = require("../models/cars");
const bcrypt = require("bcrypt");

router.get("/", verifyToken, async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    const myRents = await Rent.find({ id })
      .populate("car")
      .populate("user")
      .lean();
    res.json(myRents);
    //res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("Something was wrong!");
  }
});

router.get("/info/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  const myRents = await Rent.find({ id })
    .populate("car")
    .populate("user")
    .lean();
  //res.json({message: `User by id #${id}`, user: user, rents: myRents});
  res.json(user);
});

router.get("/myRents/:id", async (req, res) => {
  const id = req.decode;
  console.log(id);
  const myRents = await Rent.find({ id }).populate("user").lean();
  res.json(myRents);
});

router.put("/user/:id", async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  try {
    const id = req.params.id;
    const existng = await User.findById(id);

    existng.email = req.body.email.trim();
    existng.hashedPassword = await bcrypt.hash(
      req.body.hashedPassword.trim(),
      10
    );
    existng.isAdmin = req.body.isAdmin;
    await existng.save();
    return res.status(200).send("User was updated successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something was wrong!");
  }
});
//delete user
router.delete("/user/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    return res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});
module.exports = router;
