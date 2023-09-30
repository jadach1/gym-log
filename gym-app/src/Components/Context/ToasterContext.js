import { Children, createContext, useContext, useState } from "react";
import Toasters from "../UI/Toasters";

const context = createContext()

const ToasterContext = (props) => {

    const context= useContext(context)

    const arrayOfMessages = [];
    const [show, setShow] = useState(false);
    let id = 0;
    
    const addMessage = (title, message) => {
        arrayOfMessages.push({
            title: title, message: message, id: id
        })
        id++;
    }

    const removeMessage = (id) => {
        const index = arrayOfMessages.indexOf(arrayOfMessages.id === id);
        if( index !== -1)
            arrayOfMessages.splice(index,1);
    }

    return (
    <context.provider value={{newMessage: addMessage, deleteMessage: removeMessage}} >
        {arrayOfMessages.forEach(toast => {
            <Toasters message={toast.message} 
                     header={toast.title} 
                     id={toast.id} />
        })}
    </context.provider>    
    )
}

export default ToasterContext;