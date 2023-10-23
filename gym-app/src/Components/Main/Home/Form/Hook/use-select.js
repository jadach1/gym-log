import {  useState } from "react";

/*
  This works with a Select field.
  Because the select dropdowns are all by default filled,
  we do not need nor require error handling
*/
const useSelect = (defaultValue) => {

  const [value, setValue] = useState(defaultValue);

    const onChangeHandler = (event) => {
        setValue(event.target.value);
    }

  return {
    value,
    onChangeHandler
  };
};

export default useSelect;
