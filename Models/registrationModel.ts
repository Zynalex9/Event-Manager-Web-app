import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event", // Reference to the Event model
      required: true,
    },
    status: {
      type: String,
      enum: ["enrolled", "completed", "cancelled"], // Status of the registration
      default: "enrolled",
    },
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt fields

const RegisteredUsersInEvent =
  mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);
export default RegisteredUsersInEvent;
