// Bootstrap
import Modal from 'react-bootstrap/Modal'
//App Components
import CreateExerciseForm from './CreateExerciseForm';

const EditFormModal = (props) => {
    
    return (
        <Modal {...props} size="lg" centered className=''>
            <Modal.Header closeButton className='bg-light'>
                <Modal.Title className='text-success'>Modify Exercise</Modal.Title>
            </Modal.Header>
            <Modal.Body className='bg-light'>
                <CreateExerciseForm onHide={props.onHide} type="edit" exercise={props.exercise} />
            </Modal.Body>
            <Modal.Footer className='bg-light'>
                <button onClick={props.onHide} className='btn btn-rounded btn-success'>Close</button>
            </Modal.Footer>
        </Modal>
    )    
}

export default EditFormModal;