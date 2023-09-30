import { useRef, useState } from "react";
import { Form, useSubmit, Link, useActionData } from "react-router-dom";

//Bootstrap
import Container from "react-bootstrap/esm/Container";

//Component
import Input from "../UI/Input";
import ErrorMessage from "../UI/ErrorMessage";

const Signup = (props) => {
  const [formValid, setFormValid] = useState(false);
  const [isError, setError] = useState(false);

  const submit = useSubmit();
  const actionData = useActionData();

  const name = useRef();
  const pword = useRef();
  const cword = useRef();

  //Resets Form whenever user goes back into an input field
  const onBlurHandler = () => {
    setError(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const username = name.current.value;
    const password = pword.current.value;
    const cpassword = pword.current.value;

    // Check to see if form is valid
    if (username.trim().length === 0 || password.trim().length === 0) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }

    submit(event.currentTarget);
    //If we receive data back from the action authentication has failed
    if (actionData) setError(true);
  };

  return (
    <Container className="">
      {/*LINK TO SIGN UP */}
      <div className="justify-content-center d-flex">
        <Link to="/login" className="row btn btn-outline-success ">
          Login
        </Link>
      </div>
      {/*HEADER */}
      <h2  className="my-3 text-success text-center">
        SIGNUP FORM
      </h2>
      {/*FORM BELOW */}
      <Form method="post" className="text-center justify-content-center d-grid">
        <div onClick={onBlurHandler}>
          <Input
            className="mt-2"
            label="username"
            ref={name}
            input={{
              type: "text",
              name: "username",
              id: "username",
              required: true,
            }}
          />
          <Input
            className="mt-2"
            label="password"
            ref={pword}
            input={{
              type: "password",
              name: "password",
              id: "password",
              required: true,
            }}
          />
            <Input
            className="mt-2"
            label="password"
            ref={pword}
            input={{
              type: "password",
              name: "confirmPassword",
              id: "cpassword",
              required: true,
              placeholder: "confirm password"
            }}
          />
          {isError && (
            <ErrorMessage
              className="my-2 rounded 3"
              error={`Error ${actionData}`}
            />
          )}
        </div>
         {/*FORM SUBMISSION BUTTON */}
        <div>
          <button
            className="mt-2 rounded-4 btn btn-outline-success"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
         {/*ERROR MESSAGE */}
        {formValid && <p>Success</p>}
      </Form>
    </Container>
  );
};

export default Signup;
