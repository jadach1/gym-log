// Bootstrap
import Modal from 'react-bootstrap/Modal'
//App Components
import CreateExerciseForm from './CreateExerciseForm';

const EditFormModal = (props) => {
    
    //function to return type of form to Component CreateExerciseForm
    const formData = () => {
     
        if(props.modaltype==="edit")
            return props.exercise;
        if(props.modaltype==="new"){
            // deep copy, or else when we return our original exercise will be overwritten
             let formCopy = structuredClone(props.exercise);
            
            formCopy.date = new Date().toISOString().split("T")[0];
            formCopy.weight = 0;
            formCopy.description = "";
            return formCopy;
        }
        return undefined;
    }

    return (
        <Modal {...props} size="lg" centered className=''>
            <Modal.Header closeButton className='bg-light'>
                <Modal.Title className='text-success'>Modify Exercise</Modal.Title>
            </Modal.Header>
            <Modal.Body className='bg-light'>
                <CreateExerciseForm onHide={props.onHide} type={props.modaltype} exercise={formData()} />
            </Modal.Body>
            <Modal.Footer className='bg-light'>
                <button onClick={props.onHide} className='btn btn-rounded btn-success'>Close</button>
            </Modal.Footer>
        </Modal>
    )    
}

export default EditFormModal;