import React from "react";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={props.className}>
      <label className={props.labelColor} htmlFor="props.input.id">{props.label}</label>
      <input
        className="w-100" /*Without this input field will overshoot the border */
        {...props.input}
        ref={ref}
        onBlur={props.onBlurHandler}
        onChange={props.onChangeHandler}
      ></input>
      {props.error && (
        <div>
          <p className="text-danger lead">Error {props.error} </p>
        </div>
      )}
    </div>
  );
});

export default Input;
