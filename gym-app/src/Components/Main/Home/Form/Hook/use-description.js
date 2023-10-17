import { useState } from "react";

/*
  This works with a Select field.
  Because the select dropdowns are all by default filled,
  we do not need nor require error handling
*/
const useDescription = (defaultValue) => {

  const [value, setValue] = useState(defaultValue);

    const onChangeHandler = (event) => {
        setValue(event.target.value);
    }

    const reset = () => { setValue("")}

  return {
    value,
    onChangeHandler,
    reset
  };
};

export default useDescription;
