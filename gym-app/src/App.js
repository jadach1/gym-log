import { RouterProvider, createBrowserRouter } from "react-router-dom";

// components
import LoginSignup from "./Components/Auhorisation/LoginSignup";
import Main from "./Components/Main/Main";
import ErrorPage from "./Components/Error/Error";
import Home from "./Components/Main/Home/Home";
import CreateExerciseForm from "./Components/Main/Home/Form/CreateExerciseForm";
import ExerciseList from "./Components/Main/Home/List/ExerciseList";
import ToasterContextProvider from "./Components/Context/ToasterContextProvider";
import MessagingToastHub from "./Components/UI/Toasts/MessagingToastHub";

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
import { action as loginSignupAction } from "./Utility/Actions/authorisation_login_signup";
import { action as logoutAction } from "./Utility/Actions/authorisation_logout";
import { action as exerciseAction} from "./Utility/Actions/exerciseAction";
import { listLoader } from "./Utility/Loaders/listLoader";
//Styles
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";



// Code
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    id: "main",
    loader: checkAuthToken,
    errorElement: <ErrorPage />,
    children: [{ path: "/home", element: <Home />, children: [
      {path: "newExercise", element: <CreateExerciseForm type="create"/>, action: exerciseAction },
      {path: "list", element: <ExerciseList />, loader: listLoader, action: exerciseAction, errorElement: <ErrorPage />, 
              children: [{
                  path: ':filter', element: <ExerciseList />, loader: listLoader},
                ]}
    ]}],
  },
  {
    path: "/login",
    element: <LoginSignup />,
    action: loginSignupAction,
    errorElement: <ErrorPage />,
  },
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
