const express = require("express");
const router = express.Router();
const User = require("./models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

// Validation Schema using Joi
const userSchema = Joi.object({
  name: Joi.string().min(2).required(),
  age: Joi.number().min(0).max(120).required(),
  dob: Joi.date().required(),
  password: Joi.string().min(10).required(),
  gender: Joi.string().valid("Male", "Female", "Other").required(),
  about: Joi.string().max(5000).allow(""),
});

// 🔹 **Register User (CREATE)**
router.post("/register", async (req, res) => {
  try {
    // Validate user input
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Check if user already exists (by name, assuming name is unique)
    const existingUser = await User.findOne({ name: req.body.name });
    if (existingUser) {
      return res.status(409).json({ error: "User with this name already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({ ...req.body, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: "Server error, please try again later" });
  }
});

// 🔹 **Get All Users (READ)**
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// 🔹 **Update User (UPDATE)**
router.put("/:id", async (req, res) => {
  try {
    // Validate user input before updating
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User updated successfully", updatedUser });
  } catch (err) {
    res.status(500).json({ error: "Error updating user" });
  }
});

// 🔹 **Delete User (DELETE)**
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

module.exports = router;
