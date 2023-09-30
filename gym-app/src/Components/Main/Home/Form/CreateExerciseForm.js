//React Imports
import { useRef, useState } from "react";
import { Form, useSubmit,useOutletContext, Navigate } from "react-router-dom";

//App Components
import Input from "../../../UI/Input";
import SelectionList from "./SelectionList";
import Container from "react-bootstrap/esm/Container";
import DateSelector from "../../../UI/DateSelector";

const CreateExerciseForm = (props) => {
  const flip = useOutletContext();
  const submit = useSubmit();

  // Form Variables
  const description = useRef();
  const [startDate, setStartDate] = useState(new Date());

  // Submission HAndler
  const onSubmitHandler = (event) => { 
    event.preventDefault();
    submit(document.getElementById('form'));
  }

  return (
    <Container className="border border-success p-3 rounded-3">
      {/*!flip && <Navigate to="../" />*/}
      <h3 className="text-success text-center">New Work Out</h3>
      <Form method="post" id="form">
        {/**BODY PART SELECT DROPDOWN */}
        <SelectionList
          onChangeHandler={(event)=>{}}
          className="my-3"
          label="Body Part"
          name="body-part"
          values={["chest", "shoulders", "arms", "legs", "back", "other"]}
        />

        {/* DATE */}
       <DateSelector name="date" onChangeHandler={(date) => setStartDate(date)} startDate={startDate}/>

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
            }}
          />
        </div>

        {/**METRIC */}
        <div className="row my-3">
          <label className="text-white">Metric</label>
          <SelectionList name="metric" values={["KG", "LB"]}  />
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
            <button onClick={onSubmitHandler} className="btn w-50 btn-success">Submit</button>
        </div>

      </Form>
    </Container>
  );
};

export default CreateExerciseForm;
