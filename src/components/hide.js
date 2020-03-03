import styled from '@emotion/styled';
import { Box, get } from 'theme-ui';

const getValue = (val, unit = 'px') => typeof val === 'string' ? val : val + unit;

const breakpoints = props => {
  return {
    xs: `@media screen and (min-width: ${getValue(props.theme.breakpoints[0], get(props.theme.unit))})`,

    sm: `@media screen and (min-width: ${
      props.theme.breakpoints[0]
    }) and (max-width: ${getValue(props.theme.breakpoints[1], get(props.theme.unit))})`,

    md: `@media screen and (min-width: ${
      props.theme.breakpoints[1]
    }) and (max-width: ${getValue(props.theme.breakpoints[2], get(props.theme.unit))})`,

    lg: `@media screen and (min-width: ${
      props.theme.breakpoints[2]
    }) and (max-width: ${getValue(props.theme.breakpoints[3], get(props.theme.unit))})`,

    xl: `@media screen and (min-width: ${
      props.theme.breakpoints[3]
    })`,

    xxl: `@media screen and (min-width: ${getValue(props.theme.breakpoints[4], get(props.theme.unit))})`,

  };
};

// breakpoints [320, 425, 768, 1024, 1440]
// xs @media screen and (min-width: 320px)
// sm @media screen and (min-width: 320px) and (max-width: 425px)
// md @media screen and (min-width: 425px) and (max-width: 768px)
// lg @media screen and (min-width: 768px) and (max-width: 1024px)
// xl @media screen and (min-width: 1024px)

const hidden = key => props => (
  props[key]
    ? {
      [breakpoints(props)[key]]: {
        display: 'none',
      },
    }
    : null
);

const Hide = styled(Box)`
  ${hidden('xs')}
  ${hidden('sm')}
  ${hidden('md')}
  ${hidden('lg')}
  ${hidden('xl')}
  ${hidden('xxl')}
`;

export default Hide;
