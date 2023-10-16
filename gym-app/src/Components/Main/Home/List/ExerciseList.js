//React
import { useContext,  useState } from "react";
// React Router
import { useLoaderData, Form} from "react-router-dom";
//Bootstrap
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/esm/Card";
import Accordion from "react-bootstrap/Accordion"

// app components
import Filters from "./Filters/Filters";
import CustomIcon from "../../../../Utility/Icons/CustomIcon";
import { DeleteItem } from "./Helper/DB Calls/DeleteItem";
import EditFormModal from "../Form/EditFormModal";
import ConfirmModal from "../../../UI/ConfirmModal";
//CSS
import "./Style/List.css"

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

  const onClickHandlerLi = (id) => {
    console.log(    document.getElementById(id).style.display + " blick")
    document.getElementById(id).style.display="flex";
  }

  const onBlurHandlerLi = (id) => {
    console.log(id + " blur")
    document.getElementById(id).style.display="none";
  }

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
    <>
      <div className="d-flex justify-content-center">
        <Accordion  className="bg-dark border border-5 border-success rounded-4 row mb-3 text-center " >
          <Accordion.Item className="bg-dark p-0"  eventKey="0">
            <Accordion.Header className="d-flex justify-content-center" ><strong>Filters</strong></Accordion.Header>
            <Accordion.Body className="bg-dark">
              <div className="border border-success rounded-4 row mb-3 text-center">
                <Form action="filter">
                  <Filters
                    listOfExercises={listOfExercises}
                  />
                  <button className="btn btn-outline-success btn-lg mb-2">Go</button>
                </Form>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <EditFormModal  exercise={myExercise} animation={true} show={editModalShow} onHide={() => setEditModalShow(false)} />
      <ConfirmModal   show={confirmModalShow} onConfirm={onConfirmToDelete} onClose={() => {setConfirmModalShow(false)}}/>
      
        {
          <ul className="">
            {data.map((exercise) => {
              return (
                <li key={exercise._id} tabIndex={0} onFocus={() => onClickHandlerLi(exercise._id)} onBlur={() => onBlurHandlerLi(exercise._id)}>
                  <Card className="border border-success border-3 mb-2">
                    <Card.Body className="text-center">
                      <Card.Title>{exercise.date}</Card.Title>
                      <Card.Subtitle>{exercise.bodypart} : {exercise.exercise}</Card.Subtitle>
                      <Card.Subtitle>
                        {exercise.weight} {exercise.metric}
                      </Card.Subtitle>
                      <Card.Text>{exercise.description}</Card.Text>
                      <span id={`${exercise._id}`} className={`justify-content-center mb-3 `}>
                        {/*First icon is for deletion*/}
                        <CustomIcon
                          className="hover-double"
                          onClick={() => {setConfirmModalShow(exercise._id);}}
                          icon="delete"
                          size="xl"
                        />
                        <CustomIcon 
                        className="hover-double offset-3"
                         onClick={ () => { setEditModalShow(true); setExerciseToEdit(exercise)}} 
                         icon="edit" size="xl" />
                      </span>
                    </Card.Body>
                  </Card>
                </li>
              );
            })}
          </ul>
        }
      
    </>
  );
};

export default ExerciseList;
