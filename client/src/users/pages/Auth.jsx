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
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import classes from "./Auth.module.css";

function Auth() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
  // navigate("/", { replace: true }); // redirects to homepage and erases current page from

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      //log in request
      try {
        const responseData = await sendRequest(
          `${API_BASE}/login`,
          "POST",
          { "Content-type": "Application/json" },
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          })
        );

        logIn(responseData.user.id);
        navigate("/", { replace: true }); // redirects to homepage and erases current page from history.
      } catch (error) {} // error will be handled in useHttpClient hook
    } else {
      //sign up request.
      try {
        const responseData = await sendRequest(
          `${API_BASE}/signup`,
          "POST",
          { "Content-type": "Application/json" },
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          })
        );
        logIn(responseData.createdUser.id);
        navigate("/", { replace: true }); // redirects to homepage and erases current page from history.
      } catch (error) {} // error will be handled in useHttpClient hook
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

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
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
            errorText="Please enter a valid password, at least 6 charecters."
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
