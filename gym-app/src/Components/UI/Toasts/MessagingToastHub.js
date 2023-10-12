import { useContext } from "react";
import { ToastContext } from "../../Context/ToasterContextProvider";
import Toasters from "./Toasters";
import ToastContainer from "react-bootstrap/ToastContainer";
const MessagingToastHub = (props) => {
  const toastContext = useContext(ToastContext);

  return (
    <ToastContainer  position="" className="fixed-bottom">
      <ul>
        {toastContext.data.map((toast) => {
          return (
            <Toasters
              key={toast.id}
              colour={toast.colour}
              message={toast.message}
              header={toast.title}
              id={toast.id}
              onClose={toastContext.removeMessage}
            />
          );
        })}
      </ul>
    </ToastContainer>
  );
};

export default MessagingToastHub;
