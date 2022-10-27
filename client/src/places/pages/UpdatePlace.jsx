import React, { useEffect, useState, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import classes from "./UpdatePlace.module.css";

const PLACES = [
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

function UpdatePlace() {
  const [isLoading, setIsLoading] = useState(true);
  const { placeId } = useParams();
  console.log(placeId);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authCtx = useContext(AuthContext);
  const {isLoggedIn} = authCtx;

  const placeBeingEdited = PLACES.find((place) => place.id === placeId);

  useEffect(() => {
    if (placeBeingEdited) {
      setFormData(
        {
          title: {
            value: placeBeingEdited.title,
            isValid: true,
          },
          description: {
            value: placeBeingEdited.description,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, placeBeingEdited]);

  console.log(placeBeingEdited);

  function updatePlaceSubmitHandler(event) {
    event.preventDefault();
    console.log(formState.inputs);
  }

  if(!isLoggedIn) {
    return <Navigate to="/auth"/> ;
 }

  if (!placeBeingEdited) {
    return (
        <div className="center">
      <Card>
          <h2>Could not find the place.</h2>
      </Card>
        </div>
    );
  }

  if (isLoading) {
    return (
        <div className="center">
      <Card>
          <h2>Lodaing...</h2>
      </Card>
        </div>
    );
  }

  return (
    <form className={classes["place-form"]} onSubmit={updatePlaceSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValidity={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (atleast 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValidity={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
}

export default UpdatePlace;
