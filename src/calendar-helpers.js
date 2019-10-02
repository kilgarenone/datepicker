// (int) The current year
export const THIS_YEAR = new Date().getFullYear();

// (int) The current month starting from 1 - 12
// 1 => January, 12 => December
// getMonth() is zero-based value: Jan is 0, Dec is 11. so we plus '1'- Jan is 1, Dec is 12
export const THIS_MONTH = new Date().getMonth() + 1;

// Week days names and shortnames
export const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Calendar months names and shortnames
export const CALENDAR_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

// Weeks displayed on calendar
export const CALENDAR_WEEKS = 5;

// Pads a string value with leading zeroes(0) until length is reached
// For example: zeroPad(5, 2) => "05"
export const zeroPad = (value, length) => `${value}`.padStart(length, "0");

// (int) Number days in a month for a given year from 28 - 31
export const getNumOfDaysInGivenMonth = (
  month = THIS_MONTH,
  year = THIS_YEAR
) => {
  const months30 = [4, 6, 9, 11];
  const leapYear = year % 4 === 0;

  // eslint-disable-next-line no-nested-ternary
  return month === 2
    ? leapYear
      ? 29
      : 28
    : months30.includes(month)
    ? 30
    : 31;
};

// (int) First day of the month for a given year from 1 - 7
// 1 => Sunday, 7 => Saturday
// getDay() is zero-based value: Sun is 0, Sat is 6. so we plus '1'- Sun is 1, Sat is 7
export const getFirstDayOfTheMonth = (month = THIS_MONTH, year = THIS_YEAR) =>
  new Date(`${year}-${zeroPad(month, 2)}-01`).getDay() + 1;

// (bool) Checks if a value is a date - this is just a simple check
export const isDate = date => {
  const isDateObj = Object.prototype.toString.call(date) === "[object Date]";
  const isValidDate = date && !Number.isNaN(date.valueOf());

  return isDateObj && isValidDate;
};

// (bool) Checks if two date values are of the same month and year
export const isSameMonth = (date, basedate = new Date()) => {
  if (!(isDate(date) && isDate(basedate))) return false;

  const basedateMonth = basedate.getMonth() + 1;
  const basedateYear = basedate.getFullYear();

  const dateMonth = date.getMonth() + 1;
  const dateYear = date.getFullYear();

  return basedateMonth === dateMonth && basedateYear === dateYear;
};

// (bool) Checks if two date values are the same day
export const isSameDay = (date, basedate) => {
  if (!(isDate(date) && isDate(basedate)))
    throw new Error("Value was not a Date object");

  const basedateDate = basedate.getDate();
  const basedateMonth = basedate.getMonth() + 1;
  const basedateYear = basedate.getFullYear();

  const dateDate = date.getDate();
  const dateMonth = date.getMonth() + 1;
  const dateYear = date.getFullYear();

  return (
    basedateDate === dateDate &&
    basedateMonth === dateMonth &&
    basedateYear === dateYear
  );
};

// (string) Formats the given date as YYYY-MM-DD
// Months and Days are zero padded
export const getDateISO = (date = new Date()) => {
  if (!isDate(date))
    throw new Error(
      "Invalid date format. Please follow 'ISO 8601' format; 2013-08-30"
    );

  return [
    date.getFullYear(),
    zeroPad(date.getMonth() + 1, 2),
    zeroPad(date.getDate(), 2)
  ].join("-");
};

// ({month, year}) Gets the month and year before the given month and year
// For example: getPreviousMonth(1, 2000) => {month: 12, year: 1999}
// while: getPreviousMonth(12, 2000) => {month: 11, year: 2000}
export const getPreviousMonth = (month, year) => {
  const prevMonth = month > 1 ? month - 1 : 12;
  const prevMonthYear = month > 1 ? year : year - 1;

  return { month: prevMonth, year: prevMonthYear };
};

// ({month, year}) Gets the month and year after the given month and year
// For example: getNextMonth(1, 2000) => {month: 2, year: 2000}
// while: getNextMonth(12, 2000) => {month: 1, year: 2001}
export const getNextMonth = (month, year) => {
  const nextMonth = month < 12 ? month + 1 : 1;
  const nextMonthYear = month < 12 ? year : year + 1;

  return { month: nextMonth, year: nextMonthYear };
};

/**
 *  CALENDAR BUILDER
 *  For a month in the specified year.
 *  Returns an array of the calendar dates.
 *  Each calendar date is represented as an array => [YYYY, MM, DD]
 */
export default (month = THIS_MONTH, year = THIS_YEAR) => {
  // Get number of days in the month and the month's first day
  const monthDays = getNumOfDaysInGivenMonth(month, year);
  const monthFirstDay = getFirstDayOfTheMonth(month, year);

  // Get number of days to be displayed from previous and next months
  // These ensure a total of 42 days (6 weeks) displayed on the calendar
  const daysFromPrevMonth = monthFirstDay - 1;

  const totalThisAndPrevMonthDays = daysFromPrevMonth + monthDays;
  const fiveWeeks = CALENDAR_WEEKS * 7 - totalThisAndPrevMonthDays;
  const sixWeeks = (CALENDAR_WEEKS + 1) * 7 - totalThisAndPrevMonthDays;

  // if 'fiveWeeks' is -ve, means we need an additional row for the rest of the dates
  const daysFromNextMonth = fiveWeeks < 0 ? sixWeeks : fiveWeeks;

  // Get the previous and next months and years
  const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(
    month,
    year
  );
  const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);

  // Get number of days in previous month
  const prevMonthDays = getNumOfDaysInGivenMonth(prevMonth, prevMonthYear);

  // Builds dates to be displayed from previous month
  const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => {
    const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
    return [prevMonthYear, zeroPad(prevMonth, 2), zeroPad(day, 2)];
  });

  // Builds dates to be displayed from current month
  const thisMonthDates = [...new Array(monthDays)].map((n, index) => [
    year,
    zeroPad(month, 2),
    zeroPad(index + 1, 2)
  ]);

  // Builds dates to be displayed from next month
  const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => [
    nextMonthYear,
    zeroPad(nextMonth, 2),
    zeroPad(index + 1, 2)
  ]);

  // Combines all dates from previous, current and next months
  return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
};
