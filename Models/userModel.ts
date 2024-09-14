import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Please provide a username"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide an email"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    enrolledEvents: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Event",
        },
      },
    ],
    verifyEmailOTP: {
      type: String,
    },
    verifyEmailOTPTime: {
      type: Date,
    },
    forgetPasswordOTP: {
      type: String,
    },
    forgetPasswordOTPTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User