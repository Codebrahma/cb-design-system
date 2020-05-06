import React from 'react';
import PropTypes from 'prop-types';
import Months from './months';
import Years from './years';
import Days from './days';
import { Wrapper } from './component';

const Calendar = React.forwardRef(
  (
    { onDateChange, variant, onClickDay, onClickMonth, onClickYear, ...rest },
    ref
  ) => {
    const [date, setDate] = React.useState({
      day: null,
      month: null,
      year: null,
    });
    const [screen, setScreen] = React.useState('day');

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
      if (onDateChange) {
        onDateChange({ ...newDate, month: newDate.month + 1 });
      }
    };
    const updateCalendarScreen = (screenToShow) => {
      setScreen(screenToShow);
    };

    const handle = (key, value, day = null) => {
      const newDate = { ...date };
      newDate[key] = value;
      if (key === 'month' && day !== null) newDate.day = day;
      updateDate(newDate);
      if (key === 'month' || key === 'year') updateCalendarScreen('day');
    };

    const handleYearChange = (year) => {
      handle('year', year);
      onClickYear();
    };

    const handleMonthChange = (month, day = null) => {
      handle('month', month, day);
      onClickMonth(month);
    };

    const handleDateChange = (day) => {
      handle('day', day);
      onClickDay(day);
    };
    const calendarScreens = {
      day: (
        <Days
          onDateChange={handleDateChange}
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
  onDateChange: null,
  variant: 'primary',
  toggleOnDayClick: () => {},
  onClickDay: () => null,
  onClickMonth: () => null,
  onClickYear: () => null,
};

Calendar.propTypes = {
  onDateChange: PropTypes.func,
  variant: PropTypes.string,
  toggleOnDayClick: PropTypes.func,
  onClickDay: PropTypes.func,
  onClickMonth: PropTypes.func,
  onClickYear: PropTypes.func,
};

export default Calendar;
