const mongoose = require("mongoose");
const { Customer } = require("../models/Customer");
const { Movie } = require("../models/Movie");
const { Rental, validateRental } = require("../models/Rental");

const getRentals = async (req, res) => {
  try {
    const rentals = await Rental.find();
    return res.status(200).json({ rentals });
  } catch (error) {
    res.status(500).json([error]);
  }
};

const getRental = async (req, res) => {
  res.send("Get a rental");
};

const createRental = async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(404).json({ error: "User not found" });

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(404).json({ error: "Movie not found" });

  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  try {
    await rental.save();
    await movie.updateOne({ $inc: { numberInStock: -1 } });
    return res.status(200).json({ rental });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = { getRentals, getRental, createRental };
