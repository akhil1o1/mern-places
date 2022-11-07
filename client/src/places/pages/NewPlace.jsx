import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import { VALIDATOR_MINLENGTH } from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import classes from "./NewPlace.module.css";

function NewPlace() {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);
  const { isLoggedIn, userId } = authCtx;

  const API_BASE = "http://localhost:5000/api/places/";

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    // post request to add new place

    try {
      await sendRequest(
        API_BASE,
        "POST",
        { "Content-type": "Application/json" },
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: userId,
        })
      );

      // redirect to home page
      navigate("/");
    } catch (error) {} // error will be handled in useHttpClient hook.
  };

  if (!isLoggedIn) {
    return <Navigate to="/auth" />;
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form className={classes["place-form"]} onSubmit={placeSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="title"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
        />
        <Input
          id="address"
          element="input"
          type="text"
          label="address"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
        />
        <Input
          id="description"
          element="textarea"
          label="description"
          onInput={inputHandler}
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (atleast 5 characters)."
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
}

export default NewPlace;
