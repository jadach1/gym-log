import React from "react";
import FormSelect from "react-bootstrap/FormSelect";

/*
/ Takes a className, label, name, default message, and list of values 
/ We also pass an onChangeHandler from the parent, if necessary
*/
const SelectionList = (props) => {
  
  return (
    <div className={props.className}>
      {props.label && <label className="text-white">{props.label}</label>}
      <FormSelect
        onChange={(event) => {}}
        aria-label="Selection menu"
        name={props.name}
        defaultValue={props.defaultValue}
      >
       {props.defaultMessage && <option value="">{props.defaultMessage}</option>}
        {props.values.map((val) => {
          return (
            <option key={val} value={val}>
              {val}
            </option>
          );
        })}
      </FormSelect>
    </div>
  );
};

export default SelectionList;
