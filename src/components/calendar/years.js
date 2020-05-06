import React from 'react';
import PropTypes from 'prop-types';
import { ArrowDown, ArrowUp } from './assets';
import { initialYears } from './dates';
import { OuterWrapper, DatesButton, YearsTable, ArrowIcon } from './component';

const Years = ({ onYearChange, date, variant }) => {
  const [years, setYears] = React.useState(initialYears);
  const arrowClickHandler = (downArrow = true) => {
    let newYears = [...years];
    newYears = newYears.map((currentYears) =>
      currentYears.map((year) => (downArrow ? year + 3 : year - 3))
    );
    setYears(newYears);
  };

  return (
    <OuterWrapper>
      <ArrowIcon onClick={() => arrowClickHandler(false)}>
        <ArrowUp />
      </ArrowIcon>
      <YearsTable variant={variant}>
        <tbody>
          {years.map((yearChunk, index) => (
            <tr key={index}>
              {yearChunk.map((year) => (
                <td key={year}>
                  <DatesButton
                    type='button'
                    variant={variant}
                    onClick={() => {
                      onYearChange(year);
                    }}
                    active={date.year === year}
                  >
                    {year}
                  </DatesButton>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </YearsTable>
      <ArrowIcon onClick={arrowClickHandler}>
        <ArrowDown />
      </ArrowIcon>
    </OuterWrapper>
  );
};

Years.propTypes = {
  onYearChange: PropTypes.func.isRequired,
  date: PropTypes.shape({
    day: PropTypes.number,
    month: PropTypes.number,
    year: PropTypes.number,
  }).isRequired,
  variant: PropTypes.string.isRequired,
};

export default Years;
