//React Components
import { useEffect } from "react";
import { NavLink, useRouteLoaderData, Form } from "react-router-dom";
//Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/esm/NavbarBrand";
//App
import CustomIcon from "../../Utility/Icons/CustomIcon";

const NavigationBar = (props) => {
  const username = localStorage.getItem("username");

  return (
    <Navbar expand="lg" className="bg-dark rounded-5">
      <Container className="justify-contents-center">
        <Navbar.Toggle
          className="bg-success"
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="offset-2 ">
            {/*LINKS */}

            {/*HOME*/}
            {props.token && (
              <NavLink to="/home" className="btn btn-success m-2 btn-lg">
                Home
              </NavLink>
            )}

            {/*ADD EXERCISE*/}
            {props.token && (
              <NavLink
                to="/home/newExercise"
                className="btn btn-success m-2 btn-lg"
              >
                New Exercise
              </NavLink>
            )}

            {/*VIEW EXERCISE JOURNAL*/}
            {props.token && (
              <NavLink
                to="/home/list"
                className="btn btn-success m-2 btn-lg"
              >
                Journal
              </NavLink>
            )}
            {/*LOGOUT*/}
            {props.token && (
              <Form className="d-grid my-2" action="/logout" method="post">
                <button className="btn btn-success">Logout</button>
              </Form>
            )}

            {/*LOGIN*/}
            {!props.token && (
              <NavLink to="/login" className="btn btn-dark font-family-fantasy">
                Login
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
        <div className="text-danger">
          <strong>{username}</strong> <CustomIcon icon="user" size="2xl" />
        </div>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
