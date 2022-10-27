import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import { VALIDATOR_MINLENGTH } from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
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

  const authCtx = useContext(AuthContext);
  const {isLoggedIn} = authCtx;

  if(!isLoggedIn) {
    return <Navigate to="/auth"/>
  }


  function placeSubmitHandler(event) {
    event.preventDefault();
    console.log(formState.inputs);
  }

  return (
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
  );
}

export default NewPlace;
