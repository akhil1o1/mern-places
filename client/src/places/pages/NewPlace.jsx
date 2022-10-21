import React, { useCallback, useReducer } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import { VALIDATOR_MINLENGTH } from "../../shared/utils/validators";
import classes from "./NewPlace.module.css";

const formReducer = (state, action) => {
  let formIsValid = true;
  if (action.type === "INPUT_CHANGE") {
    for (const inputId in state.inputs) {
      if (inputId === action.inputId) {
        formIsValid = formIsValid && action.isValid;
      } else {
        formIsValid = formIsValid && state.inputs[inputId].isValid;
      }
    }
    return {
      ...state,
      inputs: {
        ...state.inputs,
        [action.inputId]: { value: action.value, isValid: action.isValid },
      },
      isValid: formIsValid,
    };
  } else {
    return state;
  }
}

function NewPlace() {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
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
    isValid: false,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);


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
      <Button type="submit" disabled={!formState.isValid} >ADD PLACE</Button>
    </form>
  );
}

export default NewPlace;
