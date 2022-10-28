import HttpError from "../Models/http-error.js";
import { nanoid } from "nanoid";

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

export const getPlacesByPlaceId = (req, res, next) => {
  const { pid } = req.params;
  const place = PLACES.find((place) => place.id === pid);
  if (!place) {
    throw new HttpError("Could not find the place for provided place id", 404);
  } else {
    res.json({ place });
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

export const createPlace = (req, res, next) => {
  const { title, description, address, creator, coordinates } = req.body;
  const createdPlace = {
    id: nanoid(),
    title,
    description,
    address,
    creator,
    location: coordinates,
  };
  console.log(createdPlace);
  PLACES.push(createdPlace);
  console.log(PLACES);
  res.status(201).json({ createdPlace });
};

export const updatePlace = (req, res, next) => {
  const { pid } = req.params;
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
  PLACES = PLACES.filter(place => place.id !== pid);

  res.status(200).json({message : "Deleted place successfully"});
};
