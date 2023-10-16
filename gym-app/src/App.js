import { RouterProvider, createBrowserRouter } from "react-router-dom";

// components
import Login from "./Components/Auhorisation/Login";
import Main from "./Components/Main/Main";
import Signup from "./Components/Auhorisation/Signup";
import ErrorPage from "./Components/Error/Error";
import Home from "./Components/Main/Home/Home";
import CreateExerciseForm from "./Components/Main/Home/Form/CreateExerciseForm";
import ExerciseList from "./Components/Main/Home/List/ExerciseList";
import ToasterContextProvider from "./Components/Context/ToasterContextProvider";

//Bootstrap
import Container from "react-bootstrap/esm/Container";
//FontAwesome
import { library} from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

// Utility Functions
import { checkAuthToken } from "./Utility/Actions/authorisation_token";
import { action as loginAction } from "./Utility/Actions/authorisation_login";
import { action as signupAction } from "./Utility/Actions/authorisation_signup";
import { action as logoutAction } from "./Utility/Actions/authorisation_logout";
import { action as newExerciseAction} from "./Utility/Actions/newExercise_action";
import { listLoader } from "./Utility/Loaders/listLoader";
import { editExerciseAction } from "./Utility/Actions/editExerciseAction";
//Styles
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MessagingToastHub from "./Components/UI/Toasts/MessagingToastHub";



// Code
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    id: "main",
    loader: checkAuthToken,
    errorElement: <ErrorPage />,
    children: [{ path: "/home", element: <Home />, children: [
      {path: "newExercise", element: <CreateExerciseForm />, action: newExerciseAction },
      {path: "list", element: <ExerciseList />, loader: listLoader, action: editExerciseAction, errorElement: <ErrorPage />, 
              children: [{
                  path: ':filter', element: <ExerciseList />, loader: listLoader},
                ]}
    ]}],
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
    errorElement: <ErrorPage />,
  },
  { path: "/signup", element: <Signup />, action: signupAction },
  { path: "/logout", action: logoutAction, errorElement: <ErrorPage /> },
]);

//Component
function App() {
  // Add Font-Awesome icons to Global App
  library.add(faSpinner, faTrashCan, faPenToSquare, faUser);
  return (
       <Container className="bg-light mt-5 py-5 rounded-5 border border-success justify-content-center">
       <h1 className="text-center text-success ">Gym Everything</h1>
       <ToasterContextProvider>
        <MessagingToastHub />
        <RouterProvider router={router} />
       </ToasterContextProvider>
   </Container>
  );
}

export default App;
