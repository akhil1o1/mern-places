import { nanoid } from "nanoid";
import { validationResult } from "express-validator";

import HttpError from "../Models/http-error.js";
import Place from "../Models/place-model.js";
import { getCoordinates } from "../Utils/location.js";

let PLACES = [
  {
    id: "p1",
    imageUrl:
      "https://s3.amazonaws.com/images.skyscrapercenter.com/thumbs/27711_500x650.jpg",
    title: "Empire State building p1",
    description: "famous sky scraper",
    address: "20 W 34th St., New York, NY 10001, United States",
    creator: "u1",
    location: {
      lat: "40.7483565",
      lng: "-73.9878531",
    },
  },
  {
    id: "p2",
    imageUrl:
      "https://s3.amazonaws.com/images.skyscrapercenter.com/thumbs/27711_500x650.jpg",
    title: "Empire State building p2",
    description: "famous sky scraper",
    address: "20 W 34th St., New York, NY 10001, United States",
    creator: "u2",
    location: {
      lat: "40.7483565",
      lng: "-73.9878531",
    },
  },
];

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

  let createdPlace;
  try {
    createdPlace = await newPlace.save();
  } catch (error) {
    return next(new HttpError("Could not create the document", 500));
  }

  res.status(201).json({ place: createdPlace });
};

export const updatePlace = async (req, res, next) => {
  const { placeId } = req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid user input. please check your data.", 422);
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

  try {
    await Place.findByIdAndDelete(placeId);
  } catch (error) {
    return next(new HttpError("Could not find the place for that id", 404));
  }
  
  res.status(200).json({ message: "Deleted place successfully" });
};
