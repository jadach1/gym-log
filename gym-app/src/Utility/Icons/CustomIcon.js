// REACT ICONS - FONT AWESOME ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Name of the icone.  size (2xs,xs,sm,lg,xl,2xl)
const CustomIcon = (props) => {
    let icon = "fa-spinner";
  switch (props.icon) {
    case "delete":
      icon = "fa-trash-can";
      break;
    case "edit":
        icon = "fa-pen-to-square";
        break;
    case "user":
        icon = "fa-user";
        break;
    case "new":
        icon = "fa-fire-flame-curved";
        break;
    default:
      icon = "fa-spinner";
      break;
  }
  return (
    <FontAwesomeIcon
      className={`text-center ${props.className}`}
      icon={`fa-solid ${icon}`}
      size={props.size}
      spin={props.spin}
      style={{ color: "#5fca07" }}
      onClick={props.onClick}
    />
  );
};

export default CustomIcon;
