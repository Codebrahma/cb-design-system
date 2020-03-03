import styled from '@emotion/styled';
import { Box } from 'theme-ui';

const getValue = val => (typeof val === 'string' ? val : val + 'px');

const breakpoints = ({ theme: { breakpoints } }) => ({
  xs: `@media screen and (min-width: ${getValue(breakpoints[0])})`,

  sm: `@media screen and (min-width: ${
    breakpoints[0]
  }) and (max-width: ${getValue(breakpoints[1])})`,

  md: `@media screen and (min-width: ${
    breakpoints[1]
  }) and (max-width: ${getValue(breakpoints[2])})`,

  lg: `@media screen and (min-width: ${
    breakpoints[2]
  }) and (max-width: ${getValue(breakpoints[3])})`,

  xl: `@media screen and (min-width: ${breakpoints[3]})`,

  xxl: `@media screen and (min-width: ${getValue(breakpoints[4])})`,
});

// breakpoints [320, 425, 768, 1024, 1440]
// xs @media screen and (min-width: 320px)
// sm @media screen and (min-width: 320px) and (max-width: 425px)
// md @media screen and (min-width: 425px) and (max-width: 768px)
// lg @media screen and (min-width: 768px) and (max-width: 1024px)
// xl @media screen and (min-width: 1024px)

const hidden = key => props =>
  props[key]
    ? {
      [breakpoints(props)[key]]: {
        display: 'none',
      },
    }
    : null;

const Hide = styled(Box)`
  ${hidden('xs')}
  ${hidden('sm')}
  ${hidden('md')}
  ${hidden('lg')}
  ${hidden('xl')}
  ${hidden('xxl')}
`;

export default Hide;
