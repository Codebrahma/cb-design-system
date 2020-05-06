import React from 'react';
import PropTypes from 'prop-types';
import { months } from './dates';
import { createChunks } from './utils';
import {
  OuterWrapper,
  MonthsTable,
  DatesButton,
  HeaderText,
  HeaderContainer,
} from './component';

const Months = ({ onMonthSelect, date, updateScreen, variant }) => {
  const monthsGroup = createChunks(months, 3);

  return (
    <OuterWrapper>
      <HeaderContainer>
        <HeaderText onClick={() => updateScreen('year')} variant={variant}>
          {date.year}
        </HeaderText>
      </HeaderContainer>
      <MonthsTable variant={variant}>
        <tbody>
          {monthsGroup.map((monthGrp, index) => (
            <tr key={index}>
              {monthGrp.map((month) => (
                <td key={month}>
                  <DatesButton
                    variant={variant}
                    type='button'
                    active={months.indexOf(month) === date.month}
                    onClick={() => {
                      onMonthSelect(months.indexOf(month));
                    }}
                  >
                    {month}
                  </DatesButton>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </MonthsTable>
    </OuterWrapper>
  );
};

Months.propTypes = {
  onMonthSelect: PropTypes.func.isRequired,
  date: PropTypes.shape({
    day: PropTypes.number,
    month: PropTypes.number,
    year: PropTypes.number,
  }).isRequired,
  updateScreen: PropTypes.func.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Months;
