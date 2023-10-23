// React
import { useEffect, useState } from "react";

//React Router Dom
import {
  Outlet,
  Navigate,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";

//Bootstrap
import Container from "react-bootstrap/Container";

const Home = (props) => {
  // let flip = useRef(true); // Controls between creating a new exercise and displaying all exercises
  const [flip, setFlip] = useState(true);
  const token = useRouteLoaderData("main");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, flip]);

  return (
    <Container className="p-3">
      <div className="p-5 mb-4 bg-dark rounded-3">
        <h1 className="header text-center text-success">Workouts</h1>
        <div className="row my-5 d-flex justify-content-center">
          <button
            onClick={() => {
              setFlip(!flip);
            }}
            className="btn w-50 btn-success"
          >
            {(!flip && <p>Add New Exercise</p>) || <p>Exercise Journal</p>}
          </button>
        </div>
        <Outlet context={flip}></Outlet>
        {flip && <Navigate to="/home/newExercise" />}
        {!flip && <Navigate to="/home/list" />}
      </div>
    </Container>
  );
};

export default Home;
