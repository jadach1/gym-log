//React Imports
import { useEffect, useRef, useState, useContext } from "react";
import {
  Form,
  useSubmit,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { ToastContext } from "../../../Context/ToasterContextProvider";
//App Components
import Input from "../../../UI/Input";
import SelectionList from "./SelectionList";
import Container from "react-bootstrap/esm/Container";
import DateSelector from "../../../UI/DateSelector";
import useInput from "./Hook/use-input";
import { randomQuotes } from "../../../UI/Toasts/quotes";
import { randomColours } from "../../../UI/Toasts/randomColours";

const CreateExerciseForm = (props) => {
  const submit = useSubmit();
  const toastContext = useContext(ToastContext);
  let actionData = useActionData();
  const navigate = useNavigation();

  // Form Variables
  const [startDate, setStartDate] = useState(new Date());
  
  const {
    value: exercise,
    isValid: isValidEx,
    error: errorEx,
    onBlurHandler: onBlurHandlerEx,
    onChangeHandler: onChangeHandlerEx,
    reset: clearExercise
  } = useInput("");

    const {
    value: weight,
    isValid: isValidWe,
    error: errorWe,
    onBlurHandler: onBlurHandlerWe,
    onChangeHandler: onChangeHandlerWe,
    reset: clearWeight
  } = useInput("");

  const {
    value: description,
    isValid: isValidDesc,
    error: errorDesc,
    onBlurHandler: onBlurHandlerDesc,
    onChangeHandler: onChangeHandlerDesc,
    reset: clearDescription
  } = useInput("");

  // Submission HAndler
  const onSubmitHandler = (event) => {
    event.preventDefault();
    submit(document.getElementById("form"));
  };

  //Listening for Successful Submissions
  useEffect(() => {
    if (actionData) {
      const message = randomQuotes();
      const colour = randomColours();
      toastContext.addMessage("Success", message, colour);
       clearWeight();
       clearExercise();
       clearDescription();
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
            className="mt-2 text-dark"
            onBlurHandler={onBlurHandlerWe}
            onChangeHandler={onChangeHandlerWe}
            error={errorWe}
            input={{
              type: "number",
              name: "weight",
              id: "weight",
              value: weight,
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
            className=""
            name="description"
            onChange={onChangeHandlerDesc}
            onBlur={onBlurHandlerDesc}
            value={description}
            placeholder="Gains made"
          />
        </div>

        <div className="col my-3 text-center">
          <button
            disabled={navigate.state === "submitting" || !isValidEx || !isValidWe}
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
