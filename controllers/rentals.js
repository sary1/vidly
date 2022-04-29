const getRentals = async (req, res) => {
  res.send("Get all rentals");
};

const getRental = async (req, res) => {
  res.send("Get a rental");
};

const createRental = async (req, res) => {
  res.send("Create a rental");
};

module.exports = { getRentals, getRental, createRental };
