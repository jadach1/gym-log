//Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/*Takes two parameters: Startdate and onChangeHandler
/Handled by parent, startDate uses the current date today
 and onChange is passed by parents own method of how to handle data
*/
const DateSelector = (props) => {
    return (
        <div className="row">
        <label className="bg-dark text-white">Date</label>
        <DatePicker
          className="w-100"
          name={props.name}
          selected={props.startDate}
          onChange={props.onChangeHandler}
        />
      </div>
    )
}

export default DateSelector;