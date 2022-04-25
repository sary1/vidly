const { getUsers, createUser } = require("../controllers/users");
const express = require("express");
const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);

module.exports = router;
