import React from 'react';
import styled from '@emotion/styled';
import { css, Input } from 'theme-ui';
import { applyVariation } from './../utils/getStyles';

const defaultVariants = {
  sm: {
    width: '30px',
    height: '15px',
    borderColor: 'borderGray',
    bg: 'borderGray',
    color: 'white',
  },
  md: {
    width: '38px',
    height: '19px',
    border: 'borderGray',
    bg: 'borderGray',
    color: 'white',
  },
  lg: {
    width: '44px',
    height: '22px',
    border: 'borderGray',
    bg: 'borderGray',
    color: 'white',
  },
};

const getVariants = (theme, variant = 'md', key) =>
  theme.switch[variant] && theme.switch[variant][key]
    ? theme.switch[variant][key]
    : defaultVariants[variant][key];

const Checkbox = styled(Input)`
  ${({ theme, variant }) =>
    css({
      position: 'relative',
      width: getVariants(theme, variant, 'width'),
      height: getVariants(theme, variant, 'height'),
      bg: getVariants(theme, variant, 'bg'),
      WebkitAppearance: 'none',
      outline: 'none',
      borderRadius: '50px',
      transition: '.5s',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'transparent',
      boxShadow: 'inset 0 0 5px rgba(0, 0, 0, .3)',
      '&:checked': {
        bg: 'primary',
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        borderRadius: '50px',
        borderWidth: '1px',
        borderStyle: 'solid',
        top: '-1.8px',
        left: '-1px',
        width: parseInt(getVariants(theme, variant, 'width')) / 2,
        height: getVariants(theme, variant, 'height'),
        borderColor: getVariants(theme, variant, 'border'),
        bg: getVariants(theme, variant, 'color'),
        transition: '.5s',
        transform: 'scale(1.1)',
        boxShadow: '0 2px 5px rgba(0, 0, 0, .3)',
      },
      '&:checked::before': {
        left: parseInt(getVariants(theme, variant, 'width')) * 0.5,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: getVariants(theme, variant, 'border'),
      },
    })(theme)}
  ${({ variant, theme }) => applyVariation(theme, variant, 'switch')}
`;

export default props => <Checkbox {...props} type='checkbox' />;
