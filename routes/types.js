const router = require("express").Router();
const { verifyToken } = require("../middleware/auth");
const Types = require("../models/type");

//get all types
router.get("/", verifyToken, async (req, res) => {
  try {
    const types = await Types.find({});
    res.status(200).json(types);
  } catch (error) {
    console.log(error);
  }
});
//add new type
router.post("/", verifyToken, async (req, res) => {
  try {
    const data = new Types({
      name: req.body.name,
    });
    await data.save();
    return res.status(200).json("Successfully added new type of car");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
});
//edit type
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const type = await Types.findById(id);
    return res.json(type);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
//update type
router.put("/:id", verifyToken, async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  try {
    const id = req.params.id;
    console.log(id);
    existing = await Types.findById(id);
    console.log(existing);
    existing.name = req.body.name;
    await existing.save();
    return res.status(200).json("Successfully updated");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
});
//delete type
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    await Types.findByIdAndDelete(id);
    return res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});
module.exports = router;
