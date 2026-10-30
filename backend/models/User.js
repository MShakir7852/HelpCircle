
const mongoose = require("mongoose");

// Provider Schema
const providerSchema = new mongoose.Schema(
  {
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: undefined,
      },
      coordinates: {
        type: [Number],
        default: undefined,
        validate: {
          validator: function (coordinates) {
            return (
              coordinates === undefined ||
              (coordinates.length === 2 &&
                coordinates.every(Number.isFinite) &&
                coordinates[0] >= -180 &&
                coordinates[0] <= 180 &&
                coordinates[1] >= -90 &&
                coordinates[1] <= 90)
            );
          },
          message: "Invalid location coordinates.",
        },
      },
    },

    bio: {
      type: String,
      default: "",
    },

    serviceTypes: {
      type: [String],
      default: [],
    },

    categories: {
      type: [String],
      default: [],
    },

    serviceRadiusMeters: {
      type: Number,
      default: 15000,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);

// Main User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    phone: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["customer", "provider", "admin"],
      default: "customer",
    },

    avatar: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    provider: {
      type: providerSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
  }
);

// Geospatial index
userSchema.index({
  "provider.location": "2dsphere",
});

// Remove password from safe user object
userSchema.methods.toSafeObject = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model("User", userSchema);
