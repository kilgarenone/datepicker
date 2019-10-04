import { h, Component, render } from 'preact'
import { Datepicker } from './Datepicker'
import './Calendar.css'
import { WEEK_DAYS } from './calendar-helpers'

function formatDate (dateStr) {
  if (!dateStr) return
  const date = new Date(dateStr)
  return `${WEEK_DAYS[date.getDay()]} ${date.getDate()}`
}

class DatepickerDate extends Component {
  handleChange = (name, value) => {
    document.getElementById('output').textContent = `Output: ${value}`
  };

  render () {
    return (
      <Datepicker
        name="date"
        label="Date"
        value="2019-02-11"
        onDateChanged={this.handleChange}
        formatter={formatDate}
      />
    )
  }
}

render(<DatepickerDate />, document.getElementById('root'))
