import { useState } from 'react';
import Toast from 'react-bootstrap/Toast'

const Toasters = (props) => {
    const [show, setShow] = useState(true);
    return(
        <Toast show={show} className={`bg-dark text-success border border-success `} 
        position="middle-centre" 
        onClose={ () => {props.onClose(props.id); setShow(false)} }  >
            <Toast.Header>
            {props.header}
            </Toast.Header>
            <Toast.Body>
            {props.message}
            </Toast.Body>
        </Toast>
    )
}

export default Toasters;