//React Imports
import { useEffect, useState, useContext } from "react";
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
import DateSelector from "../../../UI/DateSelector";
import useInput from "./Hook/use-input";
import useSelect from "./Hook/use-select";
import useDescription from "./Hook/use-description";
import { randomQuotes } from "../../../UI/Toasts/quotes";
import { randomColours } from "../../../UI/Toasts/randomColours";
import { createElement } from "./FormHelper/createElement";

const CreateExerciseForm = (props) => {
  const submit = useSubmit();
  const toastContext = useContext(ToastContext);
  let actionData = useActionData();
  const navigate = useNavigation();

  /*** Form Variables ***/ 
  // Date
  const [startDate, setStartDate] = useState(props.exercise ? new Date(props.exercise.date) :  new Date());
  
  // BodyPart
  const {
    value: bodypart, 
    onChangeHandler: onChangeHandlerBp
  } = useSelect(props.exercise ? (props.exercise.bodypart).toLowerCase() : "");

  // Exercise
  const {
    value: exercise,
    isValid: isValidEx,
    error: errorEx,
    onBlurHandler: onBlurHandlerEx,
    onChangeHandler: onChangeHandlerEx,
    reset: clearExercise
  } = useInput(props.exercise ? props.exercise.exercise : "");

  // Weight
  const {
    value: weight,
    isValid: isValidWe,
    error: errorWe,
    onBlurHandler: onBlurHandlerWe,
    onChangeHandler: onChangeHandlerWe,
    reset: clearWeight
  } = useInput(props.exercise ? props.exercise.weight : "");

  // Metric
  const {
    value: metric, 
    onChangeHandler: onChangeHandlerMetric
  } = useSelect(props.exercise ? props.exercise.metric : "");

  // Description
  const {
    value: description, 
    onChangeHandler: onChangeHandlerDesc,
    reset: clearDescription
  } = useDescription(props.exercise ? props.exercise.description : "");

  // Submission HAndler
  const onSubmitHandler = (event) => {
    event.preventDefault();
    //Append to the form to tell our action whether 
    //we are Creating or Editing an Exercise
      const form = document.getElementById("form");
      const elementType = createElement("type", props.type);
      form.appendChild(elementType)
    if( props.type === "edit"){
        // Append Exercise ID
         const elementId = createElement("id",props.exercise._id);
         form.appendChild(elementId)
        // Append Exercise ID
         const elementUser = createElement("user", props.exercise.user);
         form.appendChild(elementUser)
    }
    submit(form);
  };

  //Listening for Successful Submissions
  useEffect(() => {
    const rightPlaceFlag = navigate.formAction !== "/logout" ? true : false;
    if (rightPlaceFlag && navigate.state === "submitting") {
      let message = "Successfully Edited Exercise"
      let colour = "success"
      if(props.type === "create"){
        message = randomQuotes();
        colour = randomColours();
        clearWeight();
        clearExercise();
        clearDescription();
        //Remove the element we added to the form
        document.getElementById("form").removeChild(document.getElementById("type"));
      } 
      toastContext.addMessage("Success", message, colour);
      
      // If we are in the edit modal, we will exit upon submission
      if(props.type === "edit")
        props.onHide();
    }
  }, [actionData, navigate.state]);

  return (
    <div className="bg-dark border border-success p-3 rounded-3">
    
      {props.type === "create" && <h3 className="text-success text-center">New Work Out</h3>}
      <Form action="" method="post" id="form">
        {/**BODY PART SELECT DROPDOWN */}
        <SelectionList
          onChangeHandler={onChangeHandlerBp}
          className="my-3"
          label="Body Part"
          name="body-part"
          value={bodypart}
          values={["chest", "shoulders", "arms", "legs", "back", "other"]}
        />

        {/* DATE */}
        <DateSelector
          name="date"
          onChangeHandler={(date) => setStartDate(date)}
          startDate={startDate}
        />

        {/* EXERCISE */}
          <Input
            className="mt-2 text-dark"
            label="Exercise"
            labelColor="text-white"
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

        {/* WEIGHT */}
        <div className="row">
          <Input
            className="mt-2 text-dark"
            label="Weight"
            labelColor="text-white"
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
          <SelectionList 
              name="metric" 
              onChangeHandler={onChangeHandlerMetric} 
              value={metric} 
              values={["KG", "LB"]} />
        </div>

        {/* DESCRIPTION */}
        <div className="row">
          <label className="text-white">Description</label>
          <textarea
            className=""
            name="description"
            onChange={onChangeHandlerDesc}
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
    </div>
  );
};

export default CreateExerciseForm;
