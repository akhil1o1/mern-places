import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true //to make this work, install mongoose-unique-validator
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  image: {
    type: String,
    required: true
  },
  places: {
    type: String,
    required: true
  }
});

userSchema.plugin(uniqueValidator); /// to validate emails and prevent email duplication for users

const User = mongoose.model("User", userSchema);

export default User;
