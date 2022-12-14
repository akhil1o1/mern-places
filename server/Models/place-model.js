import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User"
  },
  location: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    },
  }
});

const Place = mongoose.model("Place", placeSchema);

export default Place;
