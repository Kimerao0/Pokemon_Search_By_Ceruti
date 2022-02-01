import { useState } from "react";

const useInput = (validation) => {
  const [enteredValue, setEnteredValue] = useState("");

  const [isTouched, setIsTouched] = useState();
  let errorMessage = "";
  let valueIsValid = true;
  const conditionNotMet = validation.filter(
    (el) => !el.validation(enteredValue)
  );

  if (conditionNotMet.length > 0) {
    errorMessage = conditionNotMet[0].message;
    valueIsValid = false;
  }

  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const valueBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    errorMessage,
    reset,
    valueChangeHandler,
    valueBlurHandler,
  };
};

export default useInput;
