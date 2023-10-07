import {  createContext, useEffect, useContext, useState} from "react";

export const ToastContext = createContext()

const ToasterContextProvider = (props) => {

    const [messsages, setMessages] = useState([]);
    const [id, setID] = useState(0);
    

    useEffect( () => {
        console.log("CHANGE" , messsages)
    }, [messsages])

    const actions = {
        data: messsages,
        addMessage: (title, message) => {
            setMessages( (msgs) => {
                msgs.push({title: title, message: message, id: id});
                return msgs;
            }  );
            setID( (ID) => {console.log(ID); return ID + 1});
            console.log(messsages, id);
        },
        removeMessage:  (toastId) => {
            console.log("here", toastId, id)
            const index = messsages.findIndex(msg => msg.id === toastId );
            if( index !== -1)
                setMessages((msgs) => msgs.splice(index,1));
            console.log(index, actions.data)
        }
    }

    return (
    <ToastContext.Provider value={actions} >
        {props.children}
    </ToastContext.Provider>    
    )
}

export const useToastContext = () => useContext(ToastContext);
export default ToasterContextProvider;