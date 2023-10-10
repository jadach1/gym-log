//React Imports
import { useEffect, useRef, useState, useContext } from "react";
import {
  Form,
  useSubmit,
  useActionData,
  useNavigation,
  useFetcher,
} from "react-router-dom";
import { ToastContext } from "../../../Context/ToasterContextProvider";
//App Components
import Input from "../../../UI/Input";
import SelectionList from "./SelectionList";
import Container from "react-bootstrap/esm/Container";
import DateSelector from "../../../UI/DateSelector";
import useSubmitFormCheck from "./Hook/use-input";
import useInput from "./Hook/use-input";

const CreateExerciseForm = (props) => {
  const submit = useSubmit();
  const toastContext = useContext(ToastContext);
  let actionData = useActionData();
  const navigate = useNavigation();

  // Form Variables
  const description = useRef();
  // const exercise    = useRef();
  // const weight      = useRef();

  //const [exercise, setExercise] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  //const {errorMessageExercise, errorMessageWeight, isValid} = useSubmitFormCheck(exercise);
  const {
    value: exercise,
    isValid: isValidEx,
    error: errorEx,
    onBlurHandler: onBlurHandlerEx,
    onChangeHandler: onChangeHandlerEx,
  } = useInput();

  // Submission HAndler
  const onSubmitHandler = (event) => {
    event.preventDefault();
    submit(document.getElementById("form"));
  };

  //Listening for Successful Submissions
  useEffect(() => {
    if (actionData) {
      toastContext.addMessage("Success", "Created New Gainz Bra !");
      document.getElementById("weight").value = "";
      document.getElementById("exercise").value = "";
    }
  }, [actionData]);

  return (
    <Container className="border border-success p-3 rounded-3">
    
      <h3 className="text-success text-center">New Work Out</h3>
      <Form method="post" id="form">
        {/**BODY PART SELECT DROPDOWN */}
        <SelectionList
          onChangeHandler={(event) => {}}
          className="my-3"
          label="Body Part"
          name="body-part"
          values={["chest", "shoulders", "arms", "legs", "back", "other"]}
        />

        {/* DATE */}
        <DateSelector
          name="date"
          onChangeHandler={(date) => setStartDate(date)}
          startDate={startDate}
        />

        {/* EXERCISE */}
        <div className="row my-3">
          <label className="text-white">Exercise</label>
          <Input
            className="mt-2 text-dark"
            onBlurHandler={onBlurHandlerEx}
            onChangeHandler={onChangeHandlerEx}
            error={errorEx}
            input={{
              type: "text",
              name: "exercise",
              id: "exercise",
              value: exercise,
            }}
          />
        </div>

        {/* WEIGHT */}
        <div className="row">
          <label className="text-white">Weight</label>
          <Input
            className="mt-2 text-white"
            input={{
              type: "number",
              name: "weight",
              id: "weight",
              value: "",
            }}
          />
        </div>

        {/**METRIC */}
        <div className="row my-3">
          <label className="text-white">Metric</label>
          <SelectionList name="metric" values={["KG", "LB"]} />
        </div>

        {/* DESCRIPTION */}
        <div className="row">
          <label className="text-white">Description</label>
          <textarea
            className=" "
            ref={description}
            name="description"
            placeholder="Gains made"
          />
        </div>

        <div className="col my-3 text-center">
          <button
            disabled={navigate.state === "submitting" || !isValidEx}
            onClick={onSubmitHandler}
            className="btn w-50 btn-success"
          >
            Submit
          </button>
        </div>
      </Form>
    </Container>
  );
};

export default CreateExerciseForm;
