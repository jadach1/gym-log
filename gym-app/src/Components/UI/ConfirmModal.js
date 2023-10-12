import  Modal  from "react-bootstrap/Modal";

const ConfirmModal = (props) => {
    
    return (
        <Modal show={props.show} animation={false} >
            <Modal.Header className="bg-info d-flex justify-content-center"> <strong>Confirm Deletion?</strong></Modal.Header>
            <Modal.Body className="bg-light d-flex justify-content-center">
                <button className="btn-outline-success btn btn-round" onClick={() => props.onConfirm(props.show)}>Yes</button>
                <button className="offset-1 btn btn-outline-danger btn-round" onClick={props.onClose}>No</button>
            </Modal.Body>
        </Modal>
    )
}

export default ConfirmModal;