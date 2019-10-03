import { h, Component, render } from "preact";
import { Datepicker } from "./Datepicker";
import "./Calendar.css";

class DatepickerDate extends Component {
  handleChange = (name, value) => {
    document.getElementById("output").textContent = `${name} : ${value}`;
  };
  render() {
    return (
      <Datepicker
        name="date"
        label="Date"
        value="2019-02-11"
        onDateChanged={this.handleChange}
      />
    );
  }
}

render(<DatepickerDate />, document.getElementById("root"));
