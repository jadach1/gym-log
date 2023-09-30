//React Imports
import { useRouteError } from "react-router-dom";

//Bootstrap 
import Container from "react-bootstrap/esm/Container";

// To call this page from any catch block we must declare with the catch block the following
/*
    throw new Response("Server is not responding ", {status: 500}, {statusText: error});
*/
const ErrorPage = (props) => {
    const error = useRouteError();
    console.error(error)
    return (<Container className="bg-dark text-white">
        <h1 className="bg-dark">Error {error.status}</h1>
        <p className="text-danger">{error.data}</p>
    </Container>)
};

export default ErrorPage;