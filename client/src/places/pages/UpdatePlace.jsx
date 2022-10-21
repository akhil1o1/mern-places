import React from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import classes from "./UpdatePlace.module.css";


const PLACES = [
  {
    id: "p1",
    imageUrl:
      "https://s3.amazonaws.com/images.skyscrapercenter.com/thumbs/27711_500x650.jpg",
    title: "Empire State building",
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
    title: "Empire State building",
    description: "famous sky scraper",
    address: "20 W 34th St., New York, NY 10001, United States",
    creator: "u2",
    location: {
      lat: "40.7483565",
      lng: "-73.9878531",
    },
  },
];

function UpdatePlace() {
  const { placeId } = useParams();

  const placeBeingEdited = PLACES.filter((place) => place.id === placeId);

  console.log(placeBeingEdited);

  if (!placeBeingEdited.length) {
    return (
      <div className="center">
        <h2>Could not find the place.</h2>
      </div>
    );
  }

  return (<form className={classes["place-form"]}>
    <Input 
        id="title"
        element="input"
        type="text"
        label="title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={() =>  {}}
        value={placeBeingEdited[0].title}
        valid={true}
    />
    <Input 
        id="description"
        element="textarea"
        label="description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (atleast 5 characters)."
        onInput={() =>  {}}
        value={placeBeingEdited[0].description}
        valid={true}
    />
    <Button type="submit" disabled={true}> 
        UPDATE PLACE
    </Button>
  </form>
  );
}

export default UpdatePlace;
