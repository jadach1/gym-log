import { useState } from "react";
import Toast from "react-bootstrap/Toast";

const Toasters = (props) => {
  const [show, setShow] = useState(true);
  const bg = props.header === "Success" ? "bg-warning" : "bg-danger";
  return (
      <Toast
        show={show}
        delay={3000}
        autohide
        className={`bg-light text-success border border-success my-2`}
        onClose={() => {
          props.onClose(props.id);
          setShow(false);
        }}
      >
        <Toast.Header className={`${bg} text-dark`} ><strong>{props.header}</strong></Toast.Header>
        <Toast.Body className="bg-light "><strong>{props.message}</strong></Toast.Body>
      </Toast>
  );
};

export default Toasters;
