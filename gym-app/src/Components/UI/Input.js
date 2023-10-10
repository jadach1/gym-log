import React from "react";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={props.className}>
      <label htmlFor="props.input.id">{props.label}</label>
      <input
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
