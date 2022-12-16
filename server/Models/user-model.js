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
    unique: true, //to make this work, install mongoose-unique-validator
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  image: {
    type: String,
    required: true,
  },
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: "Place" }], //an array of documents. with every document having a type of mongoose ObjectId(id of the related place document). Making relation to Place model 
});

userSchema.plugin(uniqueValidator); /// to validate emails and prevent email duplication for users

const User = mongoose.model("User", userSchema);

export default User;
