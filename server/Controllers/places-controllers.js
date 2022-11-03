import { validationResult } from "express-validator";
import mongoose from "mongoose";

import HttpError from "../Models/http-error.js";
import Place from "../Models/place-model.js";
import User from "../Models/user-model.js";
import { getCoordinates } from "../Utils/location.js";

export const getPlacesByPlaceId = async (req, res, next) => {
  const { placeId } = req.params;

  try {
    const placeFound = await Place.findById(placeId);
    res.json({ place: placeFound });
  } catch (error) {
    next(new HttpError("Could not find the place for provided place id", 404));
  }
};

export const getPlacesByUserId = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const places = await Place.find({ creator: userId });
    res.json({ places });
  } catch (error) {
    next(new HttpError("Could not find places for provided userId", 404));
  }
};

export const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // to check validation errors from express validators
    return next(
      new HttpError("Invalid user input. please check your data.", 422)
    );
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordinates(address);
  } catch (error) {
    return next(error);
  }

  const newPlace = new Place({
    title,
    description,
    address,
    creator,
    image:
      "https://s3.amazonaws.com/images.skyscrapercenter.com/thumbs/27711_500x650.jpg",
    location: coordinates,
  });

  let user;
  try {
    //checking if user with creatorID exists
    user = await User.findById(creator);
  } catch (error) {
    return next(new HttpError("Could not create the document", 500));
  }

  if (!user) {
    return next(new HttpError("Could not find the user for provided Id", 404));
  }

  console.log(user);
  // unlike regular save operation, transactions dont create collection. create collection manually in mongoDB atlas if it doesn't exist already.
  let createdPlace;
  try {
    // starting session and performing transactions / unrelated operations
    const sess = await mongoose.startSession();
    sess.startTransaction(); //starting session.
    createdPlace = await newPlace.save({ session: sess }); //making this operation part of the session

    user.places.push(createdPlace); // it will not add the createdPlace doc but only the id to the places array. its a mongoDB feature.
    await user.save({ session: sess }); //making this operation part of the session
    await sess.commitTransaction(); // saving changes if all the operation are successful otherwise it will undo the changes made to documents if any of the operation that is part of the session fails.
  } catch (error) {
    return next(new HttpError("Could not create the document.", 500));
  }

  res.status(201).json({ place: createdPlace });
};

export const updatePlace = async (req, res, next) => {
  const { placeId } = req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid user input. please check your data.", 422)
    );
  }

  const { title, description } = req.body;

  let updatedPlace;
  try {
    updatedPlace = await Place.findByIdAndUpdate(
      placeId,
      { $set: { title: title, description: description } },
      { returnDocument: "after" }
    );
  } catch (error) {
    return next(new HttpError("Could not update the document.", 500));
  }

  res.status(200).json({ updatedPlace });
};

export const deletePlace = async (req, res, next) => {
  const { placeId } = req.params;
  //deleting it in 2 steps to be able to use populate method instead of using findByIdAndDelete to delete in 1 step.
  let place;
  try {
    place = await Place.findById(placeId).populate("creator");// gives access to user document with id=creator
  } catch (error) {
    return next(new HttpError("Could not delete the place.", 500));
  }

  if (!place) {
    return next(
      new HttpError("Could not find the place for provided id.", 404)
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await Place.findByIdAndRemove({_id: placeId}, {session: sess});
    place.creator.places.pull(place); // it will remove the placeID from places array in user document. it is possible due to populate method.
    await place.creator.save({session : sess});
    await sess.commitTransaction();
  } catch (error) {
    return next(new HttpError("Could not delete the place.", 500));
  }

  res.status(200).json({ message: "Deleted place successfully." });
};
