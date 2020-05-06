import React from "react";
import PropTypes from "prop-types";
import Months from "./months";
import Years from "./years";
import Days from "./days";
import { Wrapper } from "./component";

const Calendar = React.forwardRef(
  (
    { onChange, variant, onClickDay, onClickMonth, onClickYear, ...rest },
    ref
  ) => {
    const [date, setDate] = React.useState({
      day: null,
      month: null,
      year: null,
    });
    const [screen, setScreen] = React.useState("day");

    React.useEffect(() => {
      const currentDate = new Date();
      setDate({
        day: currentDate.getDate(),
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
      });
    }, []);

    const updateDate = (newDate) => {
      setDate(newDate);
      if (onChange) {
        onChange({ ...newDate, month: newDate.month + 1 });
      }
    };
    const updateCalendarScreen = (screenToShow) => {
      setScreen(screenToShow);
    };

    const handle = (key, value, day = null, year = null) => {
      const newDate = { ...date };
      newDate[key] = value;
      if (key === "month" && day !== null) newDate.day = day;
      if (key === "month" && year !== null) newDate.year = year;
      updateDate(newDate);
      if (key === "month" || key === "year") updateCalendarScreen("day");
    };

    const handleYearChange = (year) => {
      handle("year", year);
      onClickYear();
    };

    const handleMonthChange = (month, day = null, year = null) => {
      handle("month", month, day, year);
      onClickMonth(month);
    };

    const handleDateChange = (day) => {
      handle("day", day);
      onClickDay(day);
    };
    const calendarScreens = {
      day: (
        <Days
          dayChangeHandler={handleDateChange}
          onMonthChange={handleMonthChange}
          date={date}
          updateScreen={(newScreen) => updateCalendarScreen(newScreen)}
          variant={variant}
        />
      ),
      month: (
        <Months
          onMonthSelect={handleMonthChange}
          date={date}
          updateScreen={(newScreen) => updateCalendarScreen(newScreen)}
          variant={variant}
        />
      ),
      year: (
        <Years onYearChange={handleYearChange} date={date} variant={variant} />
      ),
    };

    return (
      <Wrapper variant={variant} ref={ref} {...rest}>
        {calendarScreens[screen]}
      </Wrapper>
    );
  }
);

Calendar.defaultProps = {
  onChange: null,
  variant: "primary",
  toggleOnDayClick: () => {},
  onClickDay: () => null,
  onClickMonth: () => null,
  onClickYear: () => null,
};

Calendar.propTypes = {
  onChange: PropTypes.func,
  variant: PropTypes.string,
  toggleOnDayClick: PropTypes.func,
  onClickDay: PropTypes.func,
  onClickMonth: PropTypes.func,
  onClickYear: PropTypes.func,
};

export default Calendar;
