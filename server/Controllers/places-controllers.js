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
  const { pid: placeId} = req.params;
  try {
    const placeFound = await Place.findById(placeId);
    res.json({place : placeFound});
  } catch (error) {
     next(new HttpError("Could not find the place for provided place id", 404));
  }
};

export const getPlacesByUserId = (req, res, next) => {
  const { uid } = req.params;
  const places = PLACES.filter((place) => place.creator === uid);
  if (places.length === 0) {
    const error = new HttpError(
      "Could not find the places for provided user id.",
      404
    );
    next(error);
  } else {
    res.json({ places });
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

  const createdPlace = new Place({
    title,
    description,
    address,
    creator,
    image:
      "https://s3.amazonaws.com/images.skyscrapercenter.com/thumbs/27711_500x650.jpg",
    location: coordinates,
  });

  try {
    const response = await createdPlace.save();
    res.status(201).json({place : response});
  } catch (error) {
    next(new HttpError("Could not create the document", 500));
  }
};

export const updatePlace = (req, res, next) => {
  const { pid } = req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid user input. please check your data.", 422);
  }

  const { title, description } = req.body;

  const updatedPlace = { ...PLACES.find((place) => place.id === pid) };
  updatedPlace.title = title;
  updatedPlace.description = description;
  const placeIndex = PLACES.findIndex((p) => p.id === pid);
  console.log(placeIndex);
  PLACES[placeIndex] = updatePlace;

  res.status(200).json({ updatedPlace });
};

export const deletePlace = (req, res, next) => {
  const { pid } = req.params;

  if (!PLACES.find((place) => place.id === pid)) {
    throw new HttpError("Could not find the place for that id", 404);
  }

  PLACES = PLACES.filter((place) => place.id !== pid);

  res.status(200).json({ message: "Deleted place successfully" });
};
