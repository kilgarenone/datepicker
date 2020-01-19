import { h, Component } from "preact";

import { Calendar } from "./Calendar";
import { getDateISO } from "./calendar-helpers";
import "./Calendar.css";

export class Datepicker extends Component {
  state = { date: null, calendarOpen: false };

  componentDidMount() {
    const { value: date } = this.props;

    if (!date) return;

    this.setState({ date: getDateISO(new Date(date)) });
  }

  toggleCalendar = () => {
    this.setState(prevState => ({ calendarOpen: !prevState.calendarOpen }));
  };

  handleDateChange = dateStr => {
    const { onDateChanged, name } = this.props;
    this.setState({ date: dateStr });
    this.toggleCalendar();
    typeof onDateChanged === "function" && onDateChanged(name, dateStr);
  };

  render({ placeholder, formatter = d => d }, { date, calendarOpen }) {
    return (
      <div class="dpd" style="position:relative">
        <input
          type="text"
          value={formatter(date)}
          readOnly="readonly"
          placeholder={placeholder}
          onClick={this.toggleCalendar}
        />
        {calendarOpen && (
          <Calendar
            date={date && new Date(date)}
            onDateChanged={this.handleDateChange}
            toggleCalendar={this.toggleCalendar}
          />
        )}
      </div>
    );
  }
}
