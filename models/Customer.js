const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const customerSchema = new Schema({
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
});

const validateCustomer = (customer) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().min(3).max(50).required(),
  });
};

module.exports = { Customer, customerSchema, validateCustomer };
