//React Imports
import { useEffect, useRef, useState } from "react";
import {
  Form,
  useSubmit,
} from "react-router-dom";

//App Components
import Input from "../../../UI/Input";
import SelectionList from "./SelectionList";
import Container from "react-bootstrap/esm/Container";
import DateSelector from "../../../UI/DateSelector";

const EditExerciseForm = (props) => {
  const submit = useSubmit();
  const exercise = useRef();
  const description = useRef();
  
  const exerciseChangeHandler = (event) => {

  }

  useEffect( () => {
    console.log("Data has changed")
    //Find which data we want
    console.log(props.exercise)
  }, [props.exercise])
  // Form Variables
  const [startDate, setStartDate] = useState(new Date(props.exercise.date));

  // Submission HAndler
  const onSubmitHandler = (event) => {
    event.preventDefault();
    submit(document.getElementById("form"));
  };

  return (
    <Container className="border border-success p-3 rounded-3 bg-dark">
      <h3 className="text-success text-center">Modify Exercise</h3>
      <Form method="post" id="form">
        {/**BODY PART SELECT DROPDOWN */}
        <SelectionList
          onChangeHandler={(event) => {}}
          className="my-3"
          label="Body Part"
          name="body-part"
          defaultValue={props.exercise.bodypart}
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
            className="mt-2 text-white"
            input={{
              type: "text",
              name: "exercise",
              id: "exercise",
              required: true,
              defaultValue: props.exercise.exercise
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
              defaultValue: props.exercise.weight
            }}
          />
        </div>

        {/**METRIC */}
        <div className="row my-3">
          <label className="text-white">Metric</label>
          <SelectionList name="metric" defaultValue={props.exercise.metric} values={["KG", "LB"]} />
        </div>

        {/* DESCRIPTION */}
        <div className="row">
          <label className="text-white">Description</label>
          <textarea defaultValue={props.exercise.description} name="description" placeholder="Gains made" />
        </div>

          <input readOnly hidden name="id" value={props.exercise._id} />
          <input readOnly hidden name="user" value={props.exercise.user} />
        <div className="col my-3 text-center">
          <button onClick={onSubmitHandler} className="btn w-50 btn-success">
            Submit
          </button>
        </div>
      </Form>
    </Container>
  );
};

export default EditExerciseForm;
