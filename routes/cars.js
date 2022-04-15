const router = require("express").Router();
const { verifyToken } = require("../middleware/auth");
const Cars = require("../models/cars");
const Brands = require("../models/brand");
const Car = require("../models/cars");

//update car info
router.put("/update:id", verifyToken, async (req, res) => {
  const id = req.params.id;

  try {
    const existing = await Cars.findById(id);
    (existing.model = req.body.model),
      (existing.image = req.body.image),
      (existing.price = req.body.price),
      (existing.year = req.body.year),
      (existing.brand = req.body.brand),
      (existing.type = req.body.type),
      (existing.numberOfSeats = req.body.numberInSeats),
      (existing.numberOfDoors = req.body.numberOfDoors),
      (existing.transmission = req.body.transmission),
      (existing.numberInStock = req.body.numberInStock),
      (existing.airConditioner = req.body.airConditioner);
    await existing.save();
    return res.status(200).json("Succesfully updated car");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something wrong");
  }
  //const updateData = { $set: {isRented: true, $inc: {RentalRate: 1}}};
});
//original for development
// router.get("/all", verifyToken, async (req, res) => {
//   console.log("Make request");
//   const cars = await Cars.find({}).populate("brand").populate("type");
//   res.status(200).json(cars);
// });
//second variant for production
router.get("/all", verifyToken, async (req, res) => {
  console.log("Make request");
  const cars = await Cars.find({ isDeleted: false })
    .populate("brand")
    .populate("type");
  res.status(200).json(cars);
});
//original for development
// router.get("/top", async (req, res) => {
//   const topRentedCars = await Cars.find({})
//     .sort({ RentalRate: -1 })
//     .limit(3)
//     .populate("type");
//   //console.log(topRentedCars);
//   return res.status(200).json(topRentedCars);
// });
//second variant for production
router.get("/top", async (req, res) => {
  const topRentedCars = await Cars.find({ isDeleted: false })
    .sort({ RentalRate: -1 })
    .limit(3)
    .populate("type");
  //console.log(topRentedCars);
  return res.status(200).json(topRentedCars);
});

router.get("/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const car = await Cars.findById(id).populate("type").populate("brand").lean();
  res.status(200).json({ message: `User by id #${id}`, car });
  //return;
});
//add new car
router.post("/new", verifyToken, async (req, res) => {
  try {
    const data = new Cars({
      model: req.body.model,
      image: req.body.image,
      price: req.body.price,
      year: req.body.year,
      brand: req.body.brand,
      type: req.body.type,
      numberInSeats: req.body.seats,
      numberOfDoors: req.body.doors,
      transmission: req.body.transmission,
      numberInStock: req.body.numberInStock,
      airConditioner: req.body.airConditioner,
    });
    console.log(data);
    await data.save();
    return res.status(200).json("Successfully added new car");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
});
router.put("/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  //const updateData = { $set: {isRented: true, $inc: {RentalRate: 1}}};
  Cars.findOneAndUpdate(
    { _id: id },
    {
      $set: { isRented: true },
      $inc: { RentalRate: +1 },
    },
    { new: true },
    function (err, response) {
      if (err) {
        return res.json("Something was wrong");
      } else {
        return res.json("success");
      }
    }
  );
});
//original for development
// router.delete("/:id", verifyToken, async (req, res) => {
//   try {
//     id = req.params.id;
//     await Cars.findByIdAndDelete(id);
//     return res.status(204).end();
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json(error.message);
//   }
// });
//second variant for production
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    id = req.params.id;
    await Cars.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true }
    );
    return res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});
//get all brands
router.get("/brand", verifyToken, async (req, res) => {
  const brands = await Brands.find({});
  res.status(200).json(brands);
});
//add new brand
router.post("/brand", verifyToken, async (req, res) => {
  try {
    const data = new Brands({
      name: req.body.type,
    });
    await data.save();
    return res.status(200).json("Successfully added new brand");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
});
//edit brand
router.get("/brand/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const brand = await Brands.findById(id);
    return res.json(brand);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
//update brand
router.put("/brand/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    existing = await Brands.findById(id);
    existing.type = req.body.type;
    await existing.save();
    return res.status(200).json("Successfully updated");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
});
//delete brand
router.delete("/brand/:id", verifyToken, async (req, res) => {
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
