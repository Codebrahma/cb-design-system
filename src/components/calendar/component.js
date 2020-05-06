import { Box, css, Flex, Text } from 'theme-ui';
import styled from '@emotion/styled';
import { applyVariation } from '../../utils/getStyles';

const DatesButton = styled(Text)`
  ${({ theme, currentMonth = true, active = false }) =>
    css({
      textTransform: 'uppercase',
      fontSize: '14px',
      color: active ? 'rgba(0, 166, 251,1)' : 'inherit',
      opacity: currentMonth ? 1 : 0.5,
      '&:hover': {
        color: 'rgba(0, 166, 251,0.8)',
      },
      cursor: 'pointer',
    })(theme)}
  ${({ theme, variant }) =>
    applyVariation(theme, `${variant}.date`, 'calendar')}
`;

const Wrapper = styled(Box)(({ theme, variant }) =>
  applyVariation(theme, `${variant}.wrapper`, 'calendar')
);

const Line = styled(Box)`
  ${({ theme }) =>
    css({
      width: '10px',
      height: '2px',
      bg: '#4a4a4a',
      mr: 20,
      ml: 20,
    })(theme)}
  ${({ theme, variant }) =>
    applyVariation(theme, `${variant}.line`, 'calendar')}
`;
const DaysTable = styled.table`
  ${({ theme }) =>
    css({
      height: '92%',
      width: '95%',
      textAlign: 'center',
    })(theme)}
  ${({ theme, variant }) =>
    applyVariation(theme, `${variant}.daysTable`, 'calendar')}
`;
const MonthsTable = styled.table`
  ${({ theme }) =>
    css({
      height: '85%',
      width: '90%',
      textAlign: 'center',
      mt: 10,
      alignSelf: 'center',
    })(theme)}
  ${({ theme, variant }) =>
    applyVariation(theme, `${variant}.monthsTable`, 'calendar')}
`;
const YearsTable = styled.table`
  ${({ theme }) =>
    css({
      height: '85%',
      width: '90%',
      textAlign: 'center',
      alignSelf: 'center',
    })(theme)}
  ${({ theme, variant }) =>
    applyVariation(theme, `${variant}.yearsTable`, 'calendar')}
`;

const OuterWrapper = styled(Flex)`
  ${({ theme }) =>
    css({
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      p: '20px 0',
      alignItems: 'center',
    })(theme)}
`;

const HeaderText = styled(Text)`
  ${({ theme }) =>
    css({
      color: 'inherit',
      fontSize: '20px',
      textTransform: 'uppercase',
      '&:hover': {
        color: 'rgba(0, 166, 251,0.8)',
      },
      cursor: 'pointer',
    })(theme)}
  ${({ theme, variant }) =>
    applyVariation(theme, `${variant}.headerText`, 'calendar')}
`;

const HeaderContainer = styled(Flex)`
  ${({ theme }) =>
    css({
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    })(theme)}
`;
const DaysText = styled.table`
  ${({ theme }) =>
    css({
      textTransform: 'uppercase',
      color: '#5c5c5c',
      fontSize: 14,
    })(theme)}
  ${({ theme, variant }) =>
    applyVariation(theme, `${variant}.daysText`, 'calendar')}
`;
const ArrowIcon = styled(Box)`
  ${({ theme }) =>
    css({
      cursor: 'pointer',
      width: 17,
      height: 27,
    })(theme)}
  ${({ theme, variant }) =>
    applyVariation(theme, `${variant}.arrowIcon`, 'calendar')}
`;

export {
  Wrapper,
  OuterWrapper,
  DaysTable,
  MonthsTable,
  YearsTable,
  HeaderText,
  HeaderContainer,
  Line,
  DatesButton,
  DaysText,
  ArrowIcon,
};
