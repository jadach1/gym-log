import  Modal  from "react-bootstrap/Modal";
import { useState } from "react";

const ConfirmModal = (props) => {
    const [show, setShow] = useState(true);

    const onClose = () => setShow(false);
    
    return (
        <Modal show={show} animation={false} >
            <Modal.Header>{props.header}</Modal.Header>
            <Modal.Body>
                <button onClick={props.onClickHandler}>Yes</button>
                <button onClick={onClose}>No</button>
            </Modal.Body>
        </Modal>
    )
}

export default ConfirmModal;