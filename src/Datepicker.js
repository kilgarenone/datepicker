import { h, Component, createRef } from "preact";

import { Calendar } from "./Calendar";
import { getDateISO } from "./calendar-helpers";
import "./Calendar.css";

export class Datepicker extends Component {
  state = { date: null, calendarOpen: false };

  datepickerRef = createRef();

  componentDidMount() {
    const { value: date } = this.props;

    if (!date) return;

    this.setState({ date: getDateISO(new Date(date)) });
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.checkClickOutside);
  }

  checkClickOutside = e => {
    if (this.datepickerRef.current) {
      if (!this.datepickerRef.current.contains(e.target)) {
        this.toggleCalendar();
      }
    }
  };

  toggleCalendar = () => {
    this.setState(
      prevState => ({ calendarOpen: !prevState.calendarOpen }),
      () => {
        if (this.state.calendarOpen) {
          document.addEventListener("click", this.checkClickOutside);
        } else {
          document.removeEventListener("click", this.checkClickOutside);
        }
      }
    );
  };

  handleDateChange = dateStr => {
    const { onDateChanged, name } = this.props;
    this.setState({ date: dateStr });
    this.toggleCalendar();
    typeof onDateChanged === "function" && onDateChanged(name, dateStr);
  };

  render({ placeholder, formatter = d => d }, { date, calendarOpen }) {
    return (
      <div ref={this.datepickerRef} class="dpd" style="position:relative">
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
          />
        )}
      </div>
    );
  }
}
