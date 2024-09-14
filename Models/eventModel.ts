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
    Description: {
      type: String,
      required: [true, "Enter the short description of event"],
      minlength: [20, "Description must be at least 20 characters long"],
      maxlength: [500, "Description must be less than 500 characters long"],
    },
    Date: {
      type: Date,
      required: true,
    },
    Location: {
      type: String,
    },
    Image: {
      type: String,
    },
    enrolledUser: [
      {
        id: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
); 

const Events = mongoose.models.Event || mongoose.model("Event", eventSchema)