import SelectionList from "../../Form/SelectionList";
import DateSelector from "../../../../UI/DateSelector";
import { useState } from "react";

const Filters = (props) => {
  const [startDate, setDate] = useState();

  return (
    <>
      <h3 className="text-success text-center">Filter</h3>
      <div className=" text-center my-2">
        {/*BODY PART */}
        <SelectionList
          className="btn"
          label="body part"
          name="bodyPart"
          defaultMessage="select body part"
          values={["all","chest", "shoulders", "arms", "legs", "back", "other"]}
        ></SelectionList>
        {/*DATE */}
        <DateSelector
          onChangeHandler={(event) => {setDate(event);}}
          startDate={startDate}
          name="date"
        />
        {/*EXERCISE*/}
        <SelectionList
          className="btn"
          label="by exercise"
          name="exercise"
          defaultMessage="Select an exercise"
          values={props.listOfExercises}
        ></SelectionList>
        {/*SORT-BY*/}
        <h3 className="text-success text-center">Sort By</h3>
        <SelectionList
          className="btn"
          label=""
          name="sortBy"
          defaultValue="date"
          values={["date", "weight", "body part", "exercise"]}
        ></SelectionList>
      </div>
    </>
  );
};

export default Filters;
