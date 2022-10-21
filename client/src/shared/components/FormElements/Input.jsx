import React, { useReducer, useEffect } from "react";

import { validate } from "../../utils/validators";
import classes from "./Input.module.css";

const inputReducer = (state, action) => {
  if (action.type === "CHANGE") {
    return {
      ...state,
      value: action.val,
      isValid: validate(action.val, action.validators),
    };
  }else if(action.type==="TOUCH"){
    return{
        ...state,
        isTouched: true
    }
  }else {
    return state;
  }
};

function Input(props) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value ? props.value : "",
    isValid: props.valid ? props.valid : false,
    isTouched: false,
  });

  const {id, onInput} = props;
  const {value, isValid} = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput])

  function changeHandler(event) {
    const { value } = event.target;
    dispatch({
      type: "CHANGE",
      val: value,
      validators: props.validators
    });
  };

  function blurHandler() {
    dispatch({
        type: "TOUCH"
    });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={blurHandler}
        value={inputState.value}
      />
    ) : (
      <textarea 
      id={props.id} 
      rows={props.rows || 3} 
      onChange={changeHandler} 
      onBlur={blurHandler}
      value={inputState.value}
      />
    );

  return (
    <div className={`${classes["form-control"]} ${!inputState.isValid && inputState.isTouched && classes["form-control--invalid"]}`}>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
}

export default Input;
