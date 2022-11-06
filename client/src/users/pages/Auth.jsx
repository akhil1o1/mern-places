import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import classes from "./Auth.module.css";

function Auth() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const navigate = useNavigate(); // react router hook for redirecting programatically

  const authCtx = useContext(AuthContext);
  const { logIn } = authCtx;

  const API_BASE = "http://localhost:5000/api/users";

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    if (isLoginMode) {
      //log in
      try {
        const response = await fetch(`${API_BASE}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();
        console.log(responseData);
        setIsLoading(false);
        if (!response.ok) {
          throw new Error(responseData.message); //error message will come from backend.
        }
        logIn();
        navigate("/", { replace: true }); // redirects to homepage and erases current page from history
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setError(error.message || "Soemthing went wrong, please try again.");
      }
    
    } else {
      //sign up request.
      try {
        const response = await fetch(`${API_BASE}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();
        console.log(responseData);
        setIsLoading(false);
        if (!response.ok) {
          throw new Error(responseData.message); //error message will come from backend.
        }
        logIn();
        navigate("/", { replace: true }); // redirects to homepage and erases current page from history
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setError(error.message || "Soemthing went wrong, please try again.");
      }
    }
  };

  function switchModeHandler() {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  }

  function errorHandler() {
    setError(null);
  }

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className={classes.authentication}>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              id="name"
              element="input"
              type="text"
              label="Name"
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
            />
          )}
          <Input
            id="email"
            element="input"
            type="email"
            label="Email"
            onInput={inputHandler}
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email"
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            onInput={inputHandler}
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password"
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </>
  );
}

export default Auth;
