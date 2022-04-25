const { User, validateUser } = require("../models/User");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const getUsers = (req, res) => {
  res.send("user router works from controller");
};

const createUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({ error: "User already exists..." });

  try {
    user = new User({ ...req.body });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    return res
      .header("x-auth-token", token)
      .json({ user: _.pick(user, ["_id", "name", "email"]) });
  } catch (error) {
    return error.code === 11000
      ? res.status(400).json({ error: "The input string must be unique" })
      : res.status(400).json({ error: error.errors.name.message });
  }
};

module.exports = { getUsers, createUser };
