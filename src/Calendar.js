import { h, Component, createRef } from "preact";

import calendar, {
  isDate,
  isSameDay,
  isSameMonth,
  getNextMonth,
  getPreviousMonth,
  WEEK_DAYS,
  CALENDAR_MONTHS
} from "./calendar-helpers";

export class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.resolveStateFromDate(props.date),
      today: new Date()
    };

    this.calendarRef = createRef();
  }

  componentDidMount() {
    document.addEventListener("keydown", this.checkClickOutside, true);
    document.addEventListener("click", this.checkClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.checkClickOutside, true);
    document.removeEventListener("click", this.checkClickOutside, true);
  }

  checkClickOutside = e => {
    if (e.type === "keydown" && e.key === "Escape") {
      this.props.toggleCalendar();
      return;
    }

    if (this.calendarRef.current) {
      if (!this.calendarRef.current.contains(e.target)) {
        this.props.toggleCalendar();
      }
    }
  };

  resolveStateFromDate = date => {
    const d = isDate(date) ? date : new Date();

    return {
      current: d,
      month: d.getMonth() + 1,
      year: d.getFullYear()
    };
  };

  getCalendarDates = () => {
    const { current, month, year } = this.state;
    const calendarMonth = month || current.getMonth() + 1;
    const calendarYear = year || current.getFullYear();

    return calendar(calendarMonth, calendarYear);
  };

  // Render the month and year header with arrow controls
  // for navigating through months and years
  renderMonthAndYear = () => {
    const { month, year } = this.state;

    // Resolve the month name from the CALENDAR_MONTHS object map
    const monthname = CALENDAR_MONTHS[month - 1];

    return (
      <div class="monthPicker">
        <button
          type="button"
          class="prevMonth"
          onClick={this.handlePrevious}
          title="Previous Month"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            class="monthArrow"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div class="monthYearLabel">
          {monthname} {year}
        </div>
        <button
          type="button"
          class="nextMonth"
          onClick={this.handleNext}
          title="Next Month"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="monthArrow"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    );
  };

  // Render the label for day of the week
  // This method is used as a map callback as seen in render()
  renderDayLabels = () => (
    // Resolve the day of the week label from the WEEK_DAYS object map
    // const daylabel = WEEK_DAYS[day].toUpperCase();
    <div class="dayLabels">
      {WEEK_DAYS.map(day => (
        <div key={day} class="dayLabel">
          {day.toUpperCase()}
        </div>
      ))}
    </div>
  );

  // Render a calendar date as returned from the calendar builder function
  // This method is used as a map callback as seen in render()
  renderCalendarDate = () => (
    <div role="presentation" class="dateLabels" onMouseDown={this.gotoDate}>
      {calendar(this.state.month, this.state.year).map((d, index) => {
        const { current, month, year, today } = this.state;

        const dateStr = d.join("-");

        const date = new Date(dateStr);

        // Check if calendar date is same day as today
        const isToday = isSameDay(date, today);

        // Check if calendar date is same day as currently selected date
        const isCurrent = isSameDay(date, current);

        // Check if calendar date is in the same month as the state month and year
        const inMonth = isSameMonth(date, new Date(`${year}-${month}-01`));

        return (
          <button
            type="button"
            // eslint-disable-next-line react/no-array-index-key
            key={`${year}-${month}-${index}`}
            data-date={dateStr}
            class={[
              !inMonth && "notInMonth",
              isCurrent && "currentDay",
              isToday && "today",
              "dateLabel"
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {date.getDate()}
          </button>
        );
      })}
    </div>
  );

  gotoDate = e => {
    // eslint-disable-next-line prefer-destructuring
    const date = e.target.dataset.date;
    const { onDateChanged } = this.props;

    this.setState(this.resolveStateFromDate(new Date(date)));
    typeof onDateChanged === "function" && onDateChanged(date);
  };

  gotoPreviousMonth = () =>
    this.setState(prevState =>
      getPreviousMonth(prevState.month, prevState.year)
    );

  gotoNextMonth = () =>
    this.setState(prevState => getNextMonth(prevState.month, prevState.year));

  gotoPreviousYear = () =>
    this.setState(prevState => ({ year: prevState.year - 1 }));

  gotoNextYear = () =>
    this.setState(prevState => ({ year: prevState.year + 1 }));

  handlePrevious = evt =>
    evt.shiftKey ? this.gotoPreviousYear() : this.gotoPreviousMonth();

  handleNext = evt =>
    evt.shiftKey ? this.gotoNextYear() : this.gotoNextMonth();

  render() {
    return (
      <div class="calendar">
        <div ref={this.calendarRef}>
          {this.renderMonthAndYear()}
          {this.renderDayLabels()}
          {this.renderCalendarDate()}
        </div>
      </div>
    );
  }
}
