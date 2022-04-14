const router = require("express").Router();
const User = require("../models/User");
const Rent = require('../models/rent');
const Cars = require('../models/cars')
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { verifyToken } = require("../middleware/auth");

dotenv.config();

router.get("/", verifyToken ,async (req, res) => {});

router.post("/:id", verifyToken ,async (req, res) => {
  try {
    const id = req.params.id;
    const car = await Cars.findById(id);
    console.log(req.body.date);
    const reservation = new Rent({
      car: car._id,
      user: req.decoded.id,
      names: req.body.names,
      date: req.body.date,
      days: req.body.days,
      total: car.price * Number(req.body.days),
    });
    //console.log(reservation);
    await reservation.save();
    return res.status(201).send({ message: reservation });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      error: error.message,
    });
  }
});

router.get('/allrents', verifyToken, async(req, res)=> {
  try {
    const rentList = await Rent.find({ isDeleted: false} ).populate("user").populate("car").lean();
    return res.status(200).json(rentList);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
})
//delete reservetion
router.delete('/:id', verifyToken, async(req, res)=> {
  try {
    const id = req.params.id;
    const deleted = await Rent.findOneAndUpdate({_id:id, isDeleted: false}, {isDeleted: true});
    res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
    
  }
})
module.exports = router
