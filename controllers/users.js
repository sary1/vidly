const { User, validateUser } = require("../models/User");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  const users = await User.find().select("-password -__v");
  res.status(200).json({ users });
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password -__v");
    if (!user) return res.status(404).json({ error: "User does not exist" });

    const token = user.generateAuthToken();
    return res.status(200).header("x-auth-token", token).json({ user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
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
      ? res.status(500).json({ error: "The input string must be unique" })
      : res.status(500).json({ error });
  }
};

module.exports = { getUsers, getUser, createUser };
