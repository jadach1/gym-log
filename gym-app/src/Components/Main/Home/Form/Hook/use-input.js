import { useEffect, useState } from "react";

/*
  This works with an Input field.
  Spits out some validation and handles the state of data being typed in
*/
const useInput = (defaultValue) => {

  const [value, setValue] = useState(defaultValue);
  const [isTouched, setTouched] = useState(false);
  const [isValid, setValid] = useState(false);
  const [error, setError] = useState(false);

//Ensure that if we are editing, not creating, an exercise 
// the form's submit button will not be disabled
useEffect( () => {
  if (defaultValue !== "")
    setValid(true)
}, [defaultValue]);

    const onBlurHandler = () => {
        setTouched(true);
        if(value===""){
          setError(" Please Enter a Value")
          setValid(false)
        } else {
          setError(false)
          setValid(true)
        }
    }

    const onChangeHandler = (event) => {
        setValue(event.target.value);
        if(isTouched && error)
          setError(false)
    }

  const reset = () => {
    setTouched(false)
    setValid(false)
    setValue("");
  }

  return {
    value,
    isValid,
    error,
    onBlurHandler,
    onChangeHandler,
    reset
  };
};

export default useInput;
