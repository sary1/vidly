const { Customer, validateCustomer } = require("../models/Customer");

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    return res.status(200).json({ customers });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: "User not found" });
    return res.status(200).json({ customer });
  } catch (error) {
    return res.status(500).json(error);
  }
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
  try {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).json({ error: "User not found" });
    return res.status(200).json({ customer });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
