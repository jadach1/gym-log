import { useContext, useState } from 'react';
import Toast from 'react-bootstrap/Toast'

import ToasterContext from '../Context/ToasterContext';
const Toasters = (props) => {
    const toastContext = useContext(ToasterContext);
    
    return(
        <Toast className={`bg-dark text-success`} 
        position="middle-centre" 
        onClose={()=> toastContext.removeMessage(props.id)}  >
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