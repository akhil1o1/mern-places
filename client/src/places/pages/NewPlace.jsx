import React from "react";

import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import classes from "./NewPlace.module.css";

function NewPlace() {
  return (
    <form className={classes["place-form"]}>
      <Input
        element="input"
        type="input"
        label="title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
      />
    </form>
  );
}

export default NewPlace;
