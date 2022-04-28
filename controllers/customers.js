const getCustomers = async (req, res) => {
  res.send("get all customers");
};

const getCustomer = async (req, res) => {
  res.send("get a customer");
};

const createCustomer = async (req, res) => {
  res.send("create a customer");
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
