const express = require("express");
const router = express.Router();

const {
  getRentals,
  getRental,
  createRental,
} = require("../controllers/rentals");

router.get("/", getRentals);
router.post("/", createRental);
router.get("/:id", getRental);

module.exports = router;
