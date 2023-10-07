import  Modal  from "react-bootstrap/Modal";
import { useState } from "react";

const ConfirmModal = (props) => {
    
    return (
        <Modal show={props.show} animation={false} >
            <Modal.Header> Confirm Deletion?</Modal.Header>
            <Modal.Body>
                <button onClick={() => props.onConfirm(props.show)}>Yes</button>
                <button onClick={props.onClose}>No</button>
            </Modal.Body>
        </Modal>
    )
}

export default ConfirmModal;