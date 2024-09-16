import mongoose from "mongoose";
import slugify from "slugify";  // Import slugify for manual slug generation

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Please provide a username"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
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
    eventsCreated: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Event",  // Reference to events the user has created
        },
      },
    ],
  },
  { timestamps: true }
);

// Pre-save hook to generate slug from username
userSchema.pre("save", function (next) {
  if (!this.isModified("username")) return next();
  this.slug = slugify(this.username, { lower: true, strict: true });
  next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
