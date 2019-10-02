import { h, Component } from "preact";

import { Calendar } from "./Calendar";
import { getDateISO } from "./calendar-helpers";
import "./Calendar.css";

export default class Datepicker extends Component {
  state = { date: null, calendarOpen: false };

  componentDidMount() {
    const { value: date } = this.props;

    if (!date) return;

    this.setState({ date: getDateISO(new Date(date)) });
  }

  toggleCalendar = () =>
    this.setState(prevState => ({ calendarOpen: !prevState.calendarOpen }));

  handleChange = evt => evt.preventDefault();

  handleDateChange = date => {
    const { onDateChanged, name } = this.props;
    // not sure why i needed to do this..
    setTimeout(() =>
      this.setState({ date: getDateISO(date), calendarOpen: false })
    );
    typeof onDateChanged === "function" && onDateChanged(name, date);
  };

  render({ label, placeholder, formatter }, { date, calendarOpen }) {
    return (
      <div class="dpd" style="position:relative">
        {label && <label>{label}</label>}
        <input
          type="text"
          value={formatter ? formatter(date) : date}
          readOnly="readonly"
          placeholder={placeholder}
          onClick={this.toggleCalendar}
          onBlur={this.toggleCalendar}
        />
        {calendarOpen && (
          <Calendar
            date={date && new Date(date)}
            onDateChanged={this.handleDateChange}
          />
        )}
      </div>
    );
  }
}
