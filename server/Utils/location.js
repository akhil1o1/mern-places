import * as dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import HttpError from "../Models/http-error.js";

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

// getCoordinates(
//   "Sardar Sarovar Dam, RPQ9+5MJ Sardar Sarovar Dam, Statue of Unity Rd, Kevadia, Gujarat 393155"
// ).then((coords) => console.log(coords));
