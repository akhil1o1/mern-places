import * as dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import HttpError from "../Models/http-error.js";

// the api being used here is TrueWay Geocoding API from rapid api.
export const getCoordinates = async (address) => {
  const options = {
    method: "GET",
    url: "https://trueway-geocoding.p.rapidapi.com/Geocode",
    params: { address: address, language: "en" },
    headers: {
      "X-RapidAPI-Host": "trueway-geocoding.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.GEOCODING_API_KEY,
    },
  };

  let coordinates;

  try {
    const response = await axios.request(options);
    coordinates = response.data.results[0].location;
  } catch (error) {
    throw new HttpError(
      "Could not find the coordinates for given address.",
      404
    );
  }

  return coordinates;
};
