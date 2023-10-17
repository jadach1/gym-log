//React Packages
import {  useRef, useState, useEffect, useContext } from "react";
import {
  Form,
  useSubmit,
  useActionData,
  useNavigation,
  useNavigate,
} from "react-router-dom";

//Bootstrap
import Container from "react-bootstrap/esm/Container";

//Components
import Input from "../UI/Input";
import ErrorMessage from "../UI/ErrorMessage";
import CustomIcon from "../../Utility/Icons/CustomIcon";
import {ToastContext} from "../Context/ToasterContextProvider";

const LoginSignup = (props) => {
  
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formType, setFormType] = useState("Login");
  
  const submit = useSubmit();
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const toastContext = useContext(ToastContext);

  const name = useRef();
  const pword = useRef();
  const cword = useRef();

  const onSubmit = async (event) => {
    event.preventDefault();
    /* We will append a new Element to the existing form, 
    so that the function being called ie the Action will 
    know whether we are trying to login or signup*/
      const form = document.getElementById("form");
      const newInput = document.createElement("input");
      newInput.setAttribute("type","text");
      newInput.setAttribute("name","type");
      newInput.setAttribute("value",formType);
      form.appendChild(newInput)
    submit(form);
  };

  useEffect(() => {
    if (actionData) {
      console.log(actionData);
      switch (actionData.status){
        case "success login":
          navigate("/");
          break;
        case "success signup":
          toastContext.addMessage("Success","Successfully Signed Up " + name.current.value, "success");
          break;
        default:
          setError(true)
          setErrorMessage(actionData.error);
          break;
      }
    }
  }, [actionData]);

  //Resets Form whenever user goes back into an input field
  const onBlurHandler = () => {
    setError(false);
  };

  const onClickFormHandler = () => { setFormType(old => {
    setError(false);
    if(old === "Login" ) return "Signup"; 
    return "Login"
  })}

  const form = (
    <>
      <div className="justify-content-center d-flex">
        <button onClick={onClickFormHandler} className="row btn btn-outline-success ">
           {formType === "Login" ? "Signup" : "Login"}
        </button>
      </div>
      {/*HEADER */}
      <h2 id="jacob" className="my-3 text-success text-center">
          {formType.toUpperCase()}
      </h2>
      {/*FORM BELOW */}
      <Form id="form" method="post" className="text-center justify-content-center d-grid">
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
              defaultValue: ""
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
              defaultValue: ""
            }}
          />
         { formType === "Signup" && <Input
            className="mt-2"
            label="password"
            ref={cword}
            input={{
              type: "password",
              name: "confirmPassword",
              id: "cpassword",
              required: true,
              placeholder: "confirm password",
              defaultValue: ""
            }}
          /> }
          {isError && (
            <ErrorMessage
              className="my-2 rounded 3"
              error={`Error ${errorMessage}`}
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
      </Form>
    </>
  );

  return (
    <Container className="text-center">
      {/*LINK TO SIGN UP */}
      {navigation.state !== "submitting" && form}
      {navigation.state === "submitting" && (
        <CustomIcon icon="faSpinner" size="2xl" spin={true} />
      )}
    </Container>
  );
};

export default LoginSignup;
