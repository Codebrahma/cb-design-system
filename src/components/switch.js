import React from 'react';
import styled from '@emotion/styled';
import { css, Input } from 'theme-ui';

const defaultVariants = {
  sm: {
    width: '30px',
    height: '15px',
    border: '#ddd',
    bg: '#ddd',
    color: '#fff',
  },
  md: {
    width: '38px',
    height: '19px',
    border: '#ddd',
    bg: '#ddd',
    color: '#fff',
  },
  lg: {
    width: '44px',
    height: '22px',
    border: '#ddd',
    bg: '#ddd',
    color: '#fff',
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
      WebkitAppearance: 'none',
      bg: getVariants(theme, variant, 'bg'),
      outline: 'none',
      borderRadius: '50px',
      transition: '.5s',
      borderColor: 'transparent',
      boxShadow: 'inset 0 0 5px rgba(0, 0, 0, .3)',
      '&:checked': {
        bg: 'primary',
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        width: parseInt(getVariants(theme, variant, 'width')) / 2,
        height: getVariants(theme, variant, 'height'),
        borderRadius: '50px',
        border: '1px solid',
        borderColor: getVariants(theme, variant, 'border'),
        top: '-1.5px',
        left: '-1px',
        bg: getVariants(theme, variant, 'color'),
        transition: '.5s',
        transform: 'scale(1.1)',
        boxShadow: '0 2px 5px rgba(0, 0, 0, .3)',
      },
      '&:checked::before': {
        left: parseInt(getVariants(theme, variant, 'width')) * 0.5,
        border: '1px solid ',
        borderColor: getVariants(theme, variant, 'border'),
      },
    })(theme)}
`;

const Switch = props => <Checkbox type='checkbox' {...props} />;

export default Switch;
