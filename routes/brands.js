const router = require("express").Router();
const { verifyToken } = require("../middleware/auth");
const Brands = require("../models/brand");

//get all brands
router.get("/", verifyToken, async (req, res) => {
  try {
    const brands = await Brands.find({});
    res.status(200).json(brands);
  } catch (error) {
    console.log(error);
  }
});
//add new brand
router.post("/", verifyToken, async (req, res) => {
  try {
    const data = new Brands({
      name: req.body.name,
    });
    await data.save();
    return res.status(200).json("Successfully added new brand");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
});
//edit brand
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const brand = await Brands.findById(id);
    return res.json(brand);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
//update brand
router.put("/:id", verifyToken, async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  try {
    const id = req.params.id;
    console.log(id);
    existing = await Brands.findById(id);
    //console.log(existing)
    existing.name = req.body.name;
    await existing.save();
    return res.status(200).json("Successfully updated");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
});
//delete brand
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    await Brands.findByIdAndDelete(id);
    return res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});
module.exports = router;
