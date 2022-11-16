import fs from "fs";
import { validationResult } from "express-validator";
import mongoose from "mongoose";

import HttpError from "../Models/http-error.js";
import Place from "../Models/place-model.js";
import User from "../Models/user-model.js";
import { getCoordinates } from "../Utils/location.js";

export const getPlaceByPlaceId = async (req, res, next) => {
  const { placeId } = req.params;

  let placeFound;
  try {
    placeFound = await Place.findById(placeId);
  } catch (error) {
    return next(
      new HttpError("Could not fetch the place. Please try again later.", 500)
    );
  }

  if (!placeFound) {
    return next(
      new HttpError("Could not find the place for the provided place id.", 404)
    );
  }

  res.json({ place: placeFound.toObject({ getters: true }) }); // will add a id field along with _id before sending the response.
};

export const getPlacesByUserId = async (req, res, next) => {
  const { userId } = req.params;

  let placesByUser;
  try {
    placesByUser = await Place.find({ creator: userId });
  } catch (error) {
    return next(
      new HttpError("Could not fetch the places. Please try again later.", 500)
    );
  }

  if (!placesByUser) {
    return next(
      new HttpError("Could not find places for the provided user id.", 404)
    );
  }

  res.json({
    places: placesByUser.map((place) => place.toObject({ getters: true })),
  });
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
    image: req.file.path, // relative path of the place image file on server
    location: coordinates,
  });

  let user;
  try {
    //checking if user with creatorID exists
    user = await User.findById(creator);
  } catch (error) {
    return next(
      new HttpError("Could not create the place, please try again later.", 500)
    );
  }

  if (!user) {
    return next(new HttpError("Could not find the user for provided Id", 404));
  }

  console.log(user);
  // unlike regular save operation, transactions don't create collection. create collection manually in mongoDB atlas if it doesn't exist already.
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
    return next(
      new HttpError("Could not create the place, please try again later.", 500)
    );
  }

  res.status(201).json({ place: createdPlace.toObject({ getters: true }) });
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

  let placeToBeUpdated;
  try {
    placeToBeUpdated = await Place.findById(placeId);
  } catch (error) {
    return next(
      new HttpError("Could not update the place, please try again later.", 500)
    );
  }

  if (!placeToBeUpdated) {
    return next(
      new HttpError("Could not find the place for provided place id.", 404)
    );
  }

  // checking if the creator of the place is same as the user currently logged in. thus making sure a user can delete the place only if it was created by him.
  // userId added to request by checkAuth middleware after extracting it from authorization header token.
  // creator is of mongoose type objectId so needs to be converted to string to compare with userId
  if (placeToBeUpdated.creator.toString() !== req.userId) {
    return next(
      new HttpError(
        "Authentication failed!!! you are not allowed to edit place.",
        401
      )
    );
  }

  // updating place with new data.
  placeToBeUpdated.title = title;
  placeToBeUpdated.description = description;

  let updatedPlace;
  try {
    updatedPlace = await placeToBeUpdated.save();
  } catch (error) {
    return next(
      new HttpError("Could not update the place, please try again later.", 500)
    );
  }

  res.status(200).json({ place: updatedPlace.toObject({ getters: true }) });
};

export const deletePlace = async (req, res, next) => {
  const { placeId } = req.params;
  //deleting it in 2 steps to be able to use populate method instead of using findByIdAndDelete to delete in 1 step.
  let place;
  try {
    place = await Place.findById(placeId).populate("creator"); // gives access to user document with id=creator
  } catch (error) {
    return next(
      new HttpError("Something went wrong, please try again later.", 500)
    );
  }

  if (!place) {
    return next(
      new HttpError("Could not find the place for provided place id.", 404)
    );
  }

  // place.creator will be populated with the entire creator/user document with id(string) along with _id(objectId) field. 
  //so place.creator.toString() !== req.userId comparison wont work thus comparing the id of the creator/user document with userId
  if (place.creator.id !== req.userId) {
    return next(
      new HttpError(
        "Authentication failed!!! you are not allowed to delete this place.",
        401
      )
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await Place.findByIdAndRemove({ _id: placeId }, { session: sess });
    place.creator.places.pull(place); // it will remove the placeID from places array in user document. it is possible due to populate method.
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    return next(
      new HttpError("Could not delete the place, please try again later.", 500)
    );
  }

  // place image will be deleted only if place is deleted from DB and corresponding creator/user document's places array in above code.
  const placeImagePath = place.image; // path of the related placeImage on server
  fs.unlink(placeImagePath, (error) => console.log(error)); // deleting related placeImage from server

  res.status(200).json({ message: "Deleted place successfully." });
};
