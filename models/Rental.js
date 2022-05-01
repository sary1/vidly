const Joi = require("joi");
const { default: mongoose } = require("mongoose");
const { Schema } = new mongoose();

const rentalsSchema = new Schema({
  customer: {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxLength: 50,
    },
    isGold: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxLength: 50,
    },
    required: true,
  },
  movie: {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 255,
      trim: true,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    required: true,
  },
  dateOut: {
    type: Date,
    default: Date.now,
    required: true,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

const Rental = mongoose.model("Rental", rentalsSchema);

const validateRental = (rental) => {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });
  return schema.validate(rental);
};

module.exports = { Rental, rentalsSchema, validateRental };
