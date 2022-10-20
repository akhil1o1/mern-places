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
        formIsValid = formIsValid && state.isValid;
      }
    }
  } else {
    return {
      ...state,
      inputs: {
        ...state.inputs,
        [action.inputId]: { value: action.value, isValid: action.isValid },
      },
      isValid: formIsValid,
    };
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

  return (
    <form className={classes["place-form"]}>
      <Input
        id="title"
        element="input"
        type="input"
        label="title"
        onInput={inputHandler}
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
      />
      <Input
        id="description"
        element="textarea"
        label="description"
        onInput={inputHandler}
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (atleast 5 characters)."
      />
      <Button type="submit" disabled={!formState.isValid} />
    </form>
  );
}

export default NewPlace;
