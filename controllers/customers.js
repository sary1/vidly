const { Customer, validateCustomer } = require("../models/Customer");

const getCustomers = async (req, res) => {
  res.send("get all customers");
};

const getCustomer = async (req, res) => {
  res.send("get a customer");
};

const createCustomer = async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const customer = new Customer(req.body);
    await customer.save();

    return res.status(200).json({ customer });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateCustomer = async (req, res) => {
  res.send("create a customer");
};

const deleteCustomer = async (req, res) => {
  res.send("create a customer");
};

module.exports = {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};