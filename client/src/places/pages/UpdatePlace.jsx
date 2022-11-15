import React, { useEffect, useContext, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import classes from "./UpdatePlace.module.css";

function UpdatePlace() {
  const [placeBeingUpdated, setPlaceBeingUpdated] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

  const { placeId } = useParams();
  console.log(placeId);

  const authCtx = useContext(AuthContext);
  const { isLoggedIn, userId, token } = authCtx;

  const navigate = useNavigate();

  console.log(formState.inputs.description.value);

  const API_BASE = "http://localhost:5000/api/places";

  useEffect(() => {
    //fetching data about the place being updated.
    const fetchPlaceData = async () => {
      try {
        const responseData = await sendRequest(`${API_BASE}/${placeId}`);
        setPlaceBeingUpdated(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {} // error being handled in useHttpClient hook.
    };
    fetchPlaceData();
  }, [placeId, sendRequest, setFormData]);

  const updatePlaceSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs);

    // posting updated place data
    try {
      await sendRequest(
        `${API_BASE}/${placeId}`,
        {
          method: "PATCH",
          headers: { 
            "Content-type": "Application/json",
            authorization: `Bearer ${token}` // a convention
          },
          body: JSON.stringify({
            title: formState.inputs.title.value,
            description: formState.inputs.description.value,
          }),
        }
      );
      navigate(`/${userId}/places`); // navigate to MyPlaces page.
    } catch (error) {}
  };

  if (!isLoggedIn) {
    return <Navigate to="/auth" />;
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && placeBeingUpdated && (
        <form
          className={classes["place-form"]}
          onSubmit={updatePlaceSubmitHandler}
        >
          <Input
            id="title"
            element="input"
            type="text"
            label="title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={placeBeingUpdated.title}
            initialValidity={true}
          />
          <Input
            id="description"
            element="textarea"
            label="description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (atleast 5 characters)."
            onInput={inputHandler}
            initialValue={placeBeingUpdated.description}
            initialValidity={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </>
  );
}

export default UpdatePlace;
