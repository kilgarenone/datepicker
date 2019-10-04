import { h, Component } from 'preact'

import calendar, {
  isDate,
  isSameDay,
  isSameMonth,
  getNextMonth,
  getPreviousMonth,
  WEEK_DAYS,
  CALENDAR_MONTHS
} from './calendar-helpers'

export class Calendar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...this.resolveStateFromDate(props.date),
      today: new Date()
    }
  }

  componentWillUnmount () {
    this.clearPressureTimer()
  }

  resolveStateFromDate = date => {
    const d = isDate(date) ? date : new Date()

    return {
      current: d,
      month: d.getMonth() + 1,
      year: d.getFullYear()
    }
  };

  getCalendarDates = () => {
    const { current, month, year } = this.state
    const calendarMonth = month || current.getMonth() + 1
    const calendarYear = year || current.getFullYear()

    return calendar(calendarMonth, calendarYear)
  };

  // Render the month and year header with arrow controls
  // for navigating through months and years
  renderMonthAndYear = () => {
    const { month, year } = this.state

    // Resolve the month name from the CALENDAR_MONTHS object map
    const monthname = CALENDAR_MONTHS[month - 1]

    return (
      <div className="monthPicker">
        <button
          type="button"
          className="prevMonth"
          onMouseDown={this.handlePrevious}
          onMouseUp={this.clearPressureTimer}
          title="Previous Month"
        >
          <span className="monthArrow">&#8592;</span>
        </button>
        <div className="monthYearLabel">
          {monthname} {year}
        </div>
        <button
          type="button"
          className="nextMonth"
          onMouseDown={this.handleNext}
          onMouseUp={this.clearPressureTimer}
          title="Next Month"
        >
          <span className="monthArrow">&#8594;</span>
        </button>
      </div>
    )
  };

  // Render the label for day of the week
  // This method is used as a map callback as seen in render()
  renderDayLabels = () => (
    // Resolve the day of the week label from the WEEK_DAYS object map
    // const daylabel = WEEK_DAYS[day].toUpperCase();
    <div className="dayLabels">
      {WEEK_DAYS.map(day => (
        <div key={day} className="dayLabel">
          {day.toUpperCase()}
        </div>
      ))}
    </div>
  );

  // Render a calendar date as returned from the calendar builder function
  // This method is used as a map callback as seen in render()
  renderCalendarDate = () => (
    <div role="presentation" className="dateLabels" onMouseDown={this.gotoDate}>
      {calendar(this.state.month, this.state.year).map((d, index) => {
        const { current, month, year, today } = this.state

        const dateStr = d.join('-')

        const date = new Date(dateStr)

        // Check if calendar date is same day as today
        const isToday = isSameDay(date, today)

        // Check if calendar date is same day as currently selected date
        const isCurrent = isSameDay(date, current)

        // Check if calendar date is in the same month as the state month and year
        const inMonth = isSameMonth(date, new Date(`${year}-${month}-01`))

        return (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`${year}-${month}-${index}`}
            data-date={dateStr}
            className={[
              !inMonth && 'notInMonth',
              isCurrent && 'currentDay',
              isToday && 'today',
              'dateLabel'
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {date.getDate()}
          </div>
        )
      })}
    </div>
  );

  gotoDate = e => {
    // eslint-disable-next-line prefer-destructuring
    const date = e.target.dataset.date
    const { onDateChanged } = this.props

    this.setState(this.resolveStateFromDate(new Date(date)))
    typeof onDateChanged === 'function' && onDateChanged(date)
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

  // to simulate pressure clicking for rapidly cycling through months or years
  handlePressure = fn => {
    if (typeof fn !== 'function') return

    fn()

    this.pressureTimeout = setTimeout(() => {
      this.pressureTimer = setInterval(fn, 100)
    }, 500)
  };

  clearPressureTimer = () => {
    this.pressureTimer && clearInterval(this.pressureTimer)
    this.pressureTimeout && clearTimeout(this.pressureTimeout)
  };

  handlePrevious = evt =>
    this.handlePressure(
      evt.shiftKey ? this.gotoPreviousYear : this.gotoPreviousMonth
    );

  handleNext = evt =>
    this.handlePressure(evt.shiftKey ? this.gotoNextYear : this.gotoNextMonth);

  render () {
    return (
      <div className="calendar">
        {this.renderMonthAndYear()}
        {this.renderDayLabels()}
        {this.renderCalendarDate()}
      </div>
    )
  }
}
