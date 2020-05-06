import React from "react";
import PropTypes from "prop-types";
import { months, days } from "./dates";
import { createChunks } from "./utils";
import {
  OuterWrapper,
  DatesButton,
  DaysTable,
  HeaderText,
  HeaderContainer,
  DaysText,
  Line,
} from "./component";
import Months from "./months";

const Days = ({
  onDateChange,
  updateScreen,
  date: calDate,
  onMonthChange,
  variant,
}) => {
  const [dates, setDates] = React.useState([]);
  const getLastDate = (year, month) => new Date(year, month + 1, 0).getDate();
  const generateDays = () => {
    const { month, year } = calDate;
    const firstDay = new Date(year, month).getDay();
    const daysArray = [];
    const previousMonthNYear =
      month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 };
    const lastDateOfPreviousMonth = getLastDate(
      previousMonthNYear.year,
      previousMonthNYear.month
    );
    let reverseDay = lastDateOfPreviousMonth;
    for (let i = 0; i < firstDay; i += 1) {
      daysArray.push({
        day: reverseDay - firstDay + 1,
        month: "prev",
      });
      reverseDay += 1;
    }
    const lastDate = getLastDate(year, month);
    const { length } = daysArray;
    let j = 1;
    for (let i = length; i < lastDate + length; i += 1) {
      daysArray.push({
        day: j,
        month: "current",
      });
      j += 1;
    }
    const { length: newLen } = daysArray;
    j = 1;
    for (let i = newLen; i < 42; i += 1) {
      daysArray.push({ day: j, month: "next" });
      j += 1;
    }
    return daysArray;
  };

  const updateDates = () => {
    const daysArray = generateDays();
    const updatedDates = createChunks(daysArray, 7);
    setDates(updatedDates);
  };

  React.useEffect(() => {
    updateDates();
  }, [calDate]);

  const dayClickHandler = (date) => {
    if (date.month === "current") {
      onDateChange(date.day);
    } else if (date.month === "prev") {
      const newMonth = calDate.month - 1;
      onMonthChange(
        newMonth < 0 ? months.length - 1 : newMonth,
        date.day,
        newMonth < 0 ? calDate.year - 1 : null
      );
    } else {
      const newMonth = calDate.month + 1;
      onMonthChange(
        newMonth === months.length ? 0 : newMonth,
        date.day,
        newMonth === months.length ? calDate.year + 1 : null
      );
    }
  };
  return (
    <OuterWrapper>
      <HeaderContainer>
        <HeaderText
          variant={variant}
          onClick={() => {
            updateScreen("month");
          }}
        >
          {months[calDate.month]}
        </HeaderText>
        <Line />
        <HeaderText
          variant={variant}
          onClick={() => {
            updateScreen("year");
          }}
        >
          {calDate.year}
        </HeaderText>
      </HeaderContainer>
      <DaysTable variant={variant}>
        <tbody>
          <tr>
            {days.map((day) => (
              <td key={day}>
                <DaysText variant={variant}>{day}</DaysText>
              </td>
            ))}
          </tr>
          {dates.map((datesGroup, index) => (
            <tr key={index}>
              {datesGroup.map((date) => (
                <td key={date.day}>
                  <DatesButton
                    variant={variant}
                    type="button"
                    active={
                      calDate.day === date.day && date.month === "current"
                    }
                    currentMonth={date.month === "current"}
                    onClick={() => dayClickHandler(date)}
                  >
                    {date.day}
                  </DatesButton>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </DaysTable>
    </OuterWrapper>
  );
};

Days.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  updateScreen: PropTypes.func.isRequired,
  date: PropTypes.shape({
    day: PropTypes.number,
    month: PropTypes.number,
    year: PropTypes.number,
  }).isRequired,
  onMonthChange: PropTypes.func.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Days;
