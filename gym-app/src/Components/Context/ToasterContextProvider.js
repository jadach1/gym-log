import {  createContext, useEffect} from "react";

export const ToastContext = createContext()

const ToasterContextProvider = (props) => {

    const arrayOfMessages = [];
    let id = 0;
    

    useEffect( () => {
        console.log("called", arrayOfMessages)
    }, [arrayOfMessages])

    const actions = {
        data: arrayOfMessages,
        addMessage: (title, message) => {
            arrayOfMessages.push({
                title: title, message: message, id: id
            })
            id+= 1;
        },
        removeMessage:  (toastId) => {
            console.log("here", toastId, id)
            const index = arrayOfMessages.findIndex(msg => msg.id === toastId );
            if( index !== -1)
                arrayOfMessages.splice(index,1);
            console.log(index, actions.data)
            actions.data = arrayOfMessages;
        }
    }

    return (
    <ToastContext.Provider value={actions} >
        {props.children}
    </ToastContext.Provider>    
    )
}

export default ToasterContextProvider;