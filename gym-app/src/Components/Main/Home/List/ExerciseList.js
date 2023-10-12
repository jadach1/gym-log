//React
import { useContext,  useState } from "react";
// React Router
import { useLoaderData, Form} from "react-router-dom";
//Bootstrap
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/esm/Card";

// app components
import Filters from "./Filters/Filters";
import CustomIcon from "../../../../Utility/Icons/CustomIcon";
import { DeleteItem } from "./Helper/DB Calls/DeleteItem";
import EditFormModal from "../Form/EditFormModal";
import ConfirmModal from "../../../UI/ConfirmModal";
//app Context
import {ToastContext} from "../../../Context/ToasterContextProvider";

// We receive data stored in variable data which holds DB values of exercises
const ExerciseList = (props) => {
  const data = useLoaderData();
  const toastContext = useContext(ToastContext);
  
  const [myExercise, setExerciseToEdit] = useState(Array.from(new Set(data.map(e => e.exercise ))));
  const [editModalShow, setEditModalShow] = useState(false);
  const [confirmModalShow,setConfirmModalShow] = useState(false);
  const [listOfExercises, setExercises] = useState(Array.from(new Set(data.map(e => e.exercise))))

  //Delete Item from setOfExercises
  const onConfirmToDelete = (id) => {
    //API call
    DeleteItem(id);
      /*Find the index in the local data array and remove it*/
      const index = data.findIndex(
        (element) => element._id === id
      );
    data.splice(index, 1)
    toastContext.addMessage("Removed","Successfully Deleted Exercise","danger")
    /*Updating the list of exercises causes the page to render, updating our changes to data */
    setExercises(Array.from(new Set(data.map(e => e.exercise ))));
    setConfirmModalShow(false);
  }

  return (
    <Container>
      <Container>
        <div className="border border-success rounded-4 row mb-3 text-center">
          <Form action="filter">
            <Filters
              listOfExercises={listOfExercises}
            />
            <button className="btn btn-outline-success btn-lg mb-2">Go</button>
          </Form>
        </div>
      </Container>
      <EditFormModal  exercise={myExercise} animation={true} show={editModalShow} onHide={() => setEditModalShow(false)} />
      <ConfirmModal   show={confirmModalShow} onConfirm={onConfirmToDelete} onClose={() => {setConfirmModalShow(false)}}/>
      <Container>
        {
          <ul>
            {data.map((exercise) => {
              return (
                <li key={exercise._id}>
                  <Card className="border border-danger">
                    <Card.Body>
                      <span className="d-flex justify-content-end">
                        {/*First icon is for deletion*/}
                        <CustomIcon
                          onClick={() => {setConfirmModalShow(exercise._id);}}
                          icon="delete"
                          size="xs"
                        />
                        <CustomIcon onClick={ () => { setEditModalShow(true); setExerciseToEdit(exercise)}} icon="edit" size="xs" />
                      </span>
                      <Card.Title>{exercise.date}</Card.Title>
                      <Card.Subtitle>{exercise.bodypart} : {exercise.exercise}</Card.Subtitle>
                      <Card.Subtitle>
                        {exercise.weight} {exercise.metric}
                      </Card.Subtitle>
                      <Card.Text>{exercise.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </li>
              );
            })}
          </ul>
        }
      </Container>
    </Container>
  );
};

export default ExerciseList;
