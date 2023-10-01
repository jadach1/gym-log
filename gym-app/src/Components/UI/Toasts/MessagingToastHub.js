import { useContext, useEffect } from "react";
import { ToastContext } from "../../Context/ToasterContextProvider";
import Toasters from "./Toasters";

const MessagingToastHub = (props) => {
    const toastContext = useContext(ToastContext);

    useEffect( ()=> {
        console.log("new context update",toastContext.data)
    },[toastContext.data])

    return (
        <ul>
              {toastContext.data.map(toast => {
                console.log("show");
             return <Toasters 
                    key={toast.id}
                    message={toast.message} 
                     header={toast.title} 
                     id={toast.id}
                     onClose={toastContext.removeMessage} />
        })}
        </ul>
    )
}

export default MessagingToastHub;