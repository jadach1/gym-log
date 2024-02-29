// React Packages
import { Navigate, Outlet} from "react-router-dom";
import { useEffect } from "react";
import { useLoaderData, redirect, useNavigate } from "react-router-dom";

// Bootstrap
import Container from "react-bootstrap/esm/Container";

// Components
import NavigationBar from "../Navigation/Navigation";
import Home from "./Home/Home";

const Main = (props) => {

    const token = useLoaderData();
    const navigate = useNavigate();

    useEffect(() => {
     if(!token || token === undefined) {  
        console.log("nav use effect found no token");
        // navigate('/login');
     } else {
        console.log("token found ", token)
        //navigate('/home');
     }
    }, [token]);
    
    return (
        <Container className="bg-light mt-5 py-5 justify-content-center">
            <NavigationBar token={token}></NavigationBar>
            <h1 className="text-center text-success ">Everyday is Gym Day</h1>
          {token &&  <Navigate to="/home" /> }
            <Outlet />
        </Container>
    )
}

export default Main;