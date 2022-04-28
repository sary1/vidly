const express = require("express");
const router = express.Router();

const {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customers");

router.get("/", getCustomers);
router.get("/:id", getCustomer);
router.post("/", createCustomer);
router.patch("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;
