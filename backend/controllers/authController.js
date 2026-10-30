
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");

// Generate JWT token
const makeToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing in environment variables.");
  }

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

// Validate GeoJSON location
const isValidLocation = (location) => {
  if (!location || location.type !== "Point") {
    return false;
  }

  const coordinates = location.coordinates;

  if (!Array.isArray(coordinates) || coordinates.length !== 2) {
    return false;
  }

  const [longitude, latitude] = coordinates;

  return (
    Number.isFinite(longitude) &&
    Number.isFinite(latitude) &&
    longitude >= -180 &&
    longitude <= 180 &&
    latitude >= -90 &&
    latitude <= 90
  );
};

// ================= REGISTER =================

exports.register = async (req, res, next) => {
  try {
    let { name, email, password, role = "customer", phone } = req.body;

    // Required fields
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }

    name = name.trim();
    email = email.trim().toLowerCase();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // Password validation
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 8 characters.",
      });
    }

    // Role validation
    if (!["customer", "provider"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid account type.",
      });
    }

    // Check existing email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user without an empty GeoJSON location
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone: phone || "",
      role,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      token: makeToken(user._id),
      user: user.toSafeObject(),
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    next(error);
  }
};

// ================= LOGIN =================

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password.",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password.",
      });
    }

    return res.json({
      success: true,
      message: "Welcome back.",
      token: makeToken(user._id),
      user: user.toSafeObject(),
    });

  } catch (error) {
    next(error);
  }
};

// ================= GET CURRENT USER =================

exports.me = (req, res) => {
  return res.json({
    success: true,
    user: req.user.toSafeObject(),
  });
};

// ================= UPDATE PROFILE =================

exports.updateProfile = async (req, res, next) => {
  try {
    const allowedFields = [
      "name",
      "phone",
      "address",
      "avatar",
    ];

    // Update basic profile
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) {
        req.user[key] = req.body[key];
      }
    }

    // Update provider profile
    if (req.user.role === "provider" && req.body.provider) {
      const providerData = req.body.provider;

      if (providerData.bio !== undefined) {
        req.user.provider.bio = providerData.bio;
      }

      if (providerData.serviceTypes !== undefined) {
        req.user.provider.serviceTypes =
          providerData.serviceTypes;
      }

      if (providerData.categories !== undefined) {
        req.user.provider.categories =
          providerData.categories;
      }

      if (providerData.serviceRadiusMeters !== undefined) {
        const radius = Number(
          providerData.serviceRadiusMeters
        );

        if (!Number.isFinite(radius) || radius < 500 || radius > 100000) {
          return res.status(400).json({
            success: false,
            message: "Service radius must be between 500 and 100000 meters.",
          });
        }

        req.user.provider.serviceRadiusMeters = radius;
      }

      if (providerData.isAvailable !== undefined) {
        req.user.provider.isAvailable =
          Boolean(providerData.isAvailable);
      }

      // Save only valid GeoJSON locations
      if (providerData.location !== undefined) {
        if (!isValidLocation(providerData.location)) {
          return res.status(400).json({
            success: false,
            message: "Invalid location. Provide valid longitude and latitude.",
          });
        }

        req.user.provider.location = {
          type: "Point",
          coordinates: providerData.location.coordinates.map(Number),
        };
      }
    }

    await req.user.save();

    return res.json({
      success: true,
      message: "Profile updated successfully.",
      user: req.user.toSafeObject(),
    });

  } catch (error) {
    next(error);
  }
};
