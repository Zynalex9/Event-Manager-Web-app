import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Enter the name of event"],
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title must be less than 100 characters long"],
    },
    shortDescription: {
      type: String,
      required: [true, "Enter the short description of event"],
      minlength: [10, "Short Description must be at least 10 characters long"],
      maxlength: [
        200,
        "Short Description must be less than 200 characters long",
      ],
    },
    description: {
      type: String,
      required: [true, "Enter the description of event"],
      minlength: [20, "Description must be at least 20 characters long"],
      maxlength: [500, "Description must be less than 500 characters long"],
    },
    EventDate: {
      type: String,
      required: true,
    },
    Location: {
      type: String,
      required: true,
      default: "Remote",
    },
    Image: {
      type: String,
    },
    EventType: {
      type: String,
    },
    enrolledUser: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",  // Ensure this is a string, not the model itself
        },
      },
    ],
  },
  { timestamps: true }
);

const Events = mongoose.models.Event || mongoose.model("Event", eventSchema);
export default Events;
