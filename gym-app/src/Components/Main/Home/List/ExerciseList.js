//React
import { useContext, useEffect, useState } from "react";
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
import ToasterContext from "../../../Context/ToasterContext";

// We receive data stored in variable data which holds DB values of exercises
const ExerciseList = (props) => {
  const data = useLoaderData();
  const context = useContext(ToasterContext);
  
  const [myExercise, setExerciseToEdit] = useState({john: "l"});
  const [modalShow, setModalShow] = useState(false);
  const [listOfExercises, setExercises] = useState(Array.from(new Set(data.map(e => e.exercise))))

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
      <EditFormModal  exercise={myExercise} animation={true} show={modalShow} onHide={() => setModalShow(false)} />
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
                          onClick={() => {
                            /*Find the index in the data array and remove it*/
                            const index = data.findIndex(
                              (element) => element._id === exercise._id
                            );
                            if (index !== -1) {
                              const confirmation = (result) => {

                                

                                if(result){
                                  DeleteItem(exercise._id);
                                  data.splice(index, 1)
                                  /*Updating the list of exercises causes the page to render, updating our changes to data */
                                  setExercises(Array.from(new Set(data.map(e => e.exercise ))));
                                  
                                }
                              }
                                <ConfirmModal onClickHandler={confirmation} title="Confirm Delete?" />
                            }
                          }}
                          icon="delete"
                          size="xs"
                        />
                        <CustomIcon onClick={ () => { setModalShow(true); setExerciseToEdit(exercise)}} icon="edit" size="xs" />
                      </span>
                      <Card.Title>{exercise.date}</Card.Title>

                      <Card.Subtitle>{exercise.bodypart} : {exercise.exercise}</Card.Subtitle>
                      <Card.Subtitle>
                        {exercise.weight} {exercise.metric}
                      </Card.Subtitle>
                      <Card.Text>{exercise.description}</Card.Text>
                    </Card.Body>
                    <Toasters  show={true} header="Success!" message="Successfully Deleted Exercise" theme="dark" />
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
