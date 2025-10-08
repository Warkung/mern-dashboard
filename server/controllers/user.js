const mongoose = require("mongoose");
const userModel = require("../models/user");
const { internalError } = require("../function/internalError");

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel
      .find({})
      .limit(req.query._end)
      .skip(req.query._start);
    res.status(200).send(users);
  } catch (error) {
    internalError(error, res);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;
    const userExists = await userModel.findOne({ email });
    if (userExists) return res.status(409).send("User already exists");
    const newUser = await userModel.create({ name, email, avatar });
    res.status(201).send(newUser);
  } catch (error) {
    internalError(error, res);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findOne({ _id: id }).populate("allProperties");
    if (!user) return res.status(404).send("User not found");
    res.status(200).send(user);
  } catch (error) {
    internalError(error, res);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
};
