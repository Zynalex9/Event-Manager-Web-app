import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event", 
      required: true,
    },
    status: {
      type: String,
      enum: ["enrolled", "completed", "cancelled"], // Status of the registration
      default: "enrolled",
    },
  },
  { timestamps: true }
); 

const RegisteredUsersInEvent =
  mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);
export default RegisteredUsersInEvent;
