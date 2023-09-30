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
    default:
      icon = "fa-spinner";
      break;
  }
  return (
    <FontAwesomeIcon
      className="text-center"
      icon={`fa-solid ${icon}`}
      size={props.size}
      spin={props.spin}
      style={{ color: "#5fca07" }}
      onClick={props.onClick}
    />
  );
};

export default CustomIcon;
