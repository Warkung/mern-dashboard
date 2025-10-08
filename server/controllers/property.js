const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const { propertyModel, userModel } = require("../models/index");
const { internalError } = require("../function/internalError");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const getAllProperties = async (req, res) => {
  try {
    const {
      _end,
      _order,
      _start,
      _sort,
      title_like = "",
      propertyType = "",
    } = req.query;
    const query = {};

    if (title_like !== "") {
      query.title_like = { $regex: title_like, $options: "i" };
    }
    if (propertyType !== "") {
      query.propertyType = { $regex: propertyType, $options: "i" };
    }
    const count = await propertyModel.countDocuments({ ...query });
    const properties = await propertyModel
      .find({ ...query })
      .limit(_end - _start)
      .skip(_start)
      .sort({ [_sort]: _order === "ASC" ? 1 : -1 });
    res.header("x-total-count", count);
    res.header("Access-Control-Expose-Headers", "x-total-count");
    res.status(200).send(properties);
  } catch (error) {
    internalError(error, res);
  }
};

export const getPropertyDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const propertyExists = await propertyModel.findOne({ _id: id });
    if (!propertyExists) return res.status(404).send("Property not found");
    res.status(200).send(propertyExists);
  } catch (error) {
    internalError(error, res);
  }
};

export const createProperty = async (req, res) => {
  try {
    const { title, propertyType, description, location, price, email, photo } =
      req.body;
    const session = await mongoose.startSession();
    session.startTransaction();
    const user = await userModel.findOne({ email }).session(session);
    if (!user) return res.status(404).send("User not found");
    // Upload image to cloudinary
    const photoUrl = await cloudinary.uploader.upload(photo, {
      folder: "properties",
    });
    const newProperty = await propertyModel.create({
      title,
      propertyType,
      description,
      location,
      price,
      photo: photoUrl.secure_url,
      creator: user._id,
    });
    user.allProperties.push(newProperty._id);
    await user.save({ session });
    await session.commitTransaction();
    res.status(201).send(newProperty);
  } catch (error) {
    internalError(error, res);
  }
};

export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, propertyType, description, location, price, photo } =
      req.body;
    const photoUrl = await cloudinary.uploader.upload(photo, {
      folder: "properties",
    });
    const property = await propertyModel.findByIdAndUpdate(
      { _id: id },
      {
        title,
        propertyType,
        description,
        location,
        price,
        photo: photoUrl.secure_url || photo,
      }
    );
    if (!property) return res.status(404).send("Property not found");
    res.status(200).send("Property updated successfully");
  } catch (error) {
    internalError(error, res);
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const propertyExists = await propertyModel
      .findOne({ _id: id })
      .populate("creator");
    if (!propertyExists) return res.status(404).send("Property not found");

    const session = await mongoose.startSession();
    session.startTransaction();

    await cloudinary.uploader.destroy(propertyExists.photo);

    await propertyExists.deleteOne({ _id: id }).session(session);
    propertyExists.creator.allProperties.pull(propertyExists);
    await propertyExists.creator.save({ session });
    await session.commitTransaction();
    res.status(200).send("Property deleted successfully");
  } catch (error) {
    internalError(error, res);
  }
};
