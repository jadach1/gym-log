import { useState } from "react";

/*
  This works with an Input field.
  Spits out some validation and handles the state of data being typed in
*/
const useInput = () => {

  const [value, setValue] = useState("");
  const [isTouched, setTouched] = useState(false);
  const [isValid, setValid] = useState(false);
  const [error, setError] = useState(false);

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

  return {
    value,
    isValid,
    error,
    onBlurHandler,
    onChangeHandler
  };
};

export default useInput;

// const useSubmitFormCheck = (exercise, weight) => {
//   const [errorMessageExercise, setErrorEx] = useState(false);
//   const [errorMessageWeight, setErrorWe] = useState(false);
//   const [isValid, setValidity] = useState(false);

//   exercise === ""
//     ? setErrorEx("Please Enter A Valid Exercise")
//     : setErrorEx(false);
//   weight === "" ? setErrorWe("Please Enter A Valid Weight") : setErrorWe(false);

//   if (errorMessageExercise || errorMessageWeight) setValidity(false);
//   else setValidity(true);

//   return {
//     errorMessageExercise,
//     errorMessageWeight,
//     isValid,
//   };
// };

// export default useSubmitFormCheck;
