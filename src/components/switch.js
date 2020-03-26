import React from 'react';
import styled from '@emotion/styled';
import { css, Input } from 'theme-ui';
import { applyVariation as getFromThemeObj, getThemeStyles } from './../utils/getStyles';

const defaultVariants = {
  sm: {
    switchBody: {
      width: '30px',
      height: '15px',
      borderColor: 'borderGray',
      bg: 'borderGray',
      '&:checked': {
        bg: 'error',
      },
    },
    switchHandle: {
      borderColor: 'borderGray',
      bg: 'white',
      '&:checked': {
        bg: 'primary',
      },
    },
  },
  md: {
    switchBody: {
      width: '36px',
      height: '18px',
      borderColor: 'success',
      bg: 'success',
      '&:checked': {
        borderColor: 'primary',
        bg: 'primary',
      },
    },
    switchHandle: {
      borderColor: 'borderGray',
      bg: 'white',
      '&:checked': {
        bg: 'primary',
      },
    },
  },
  lg: {
    switchBody: {
      width: '44px',
      height: '22px',
      borderColor: 'warning',
      bg: 'warning',
      '&:checked': {
        borderColor: 'successDark',
        bg: 'success',
      },
    },
    switchHandle: {
      borderColor: 'borderGray',
      bg: 'white',
      '&:checked': {
        bg: 'warningDark',
      },
    },
  },
};

const getWidth = (theme, variant, key = 'width') =>
  getThemeStyles(theme, 'switch', variant, 'switchBody', key) || getDefaultTheme(variant, 'switchBody', key);

const getDefaultTheme = (variant, themekey, key) => !key
  ? defaultVariants[variant][themekey]
  : defaultVariants[variant][themekey][key];

const Checkbox = styled(Input)`
  position: relative;
  Webkit-appearance: none;
  outline: none;
  border-radius: 50px;
  transition: .5s;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, .3);
  &:checked {
    ${({theme}) => css({
      bg: 'primary',
    })(theme)}
  }
  ${({theme, variant}) => css({
    ...getDefaultTheme(variant, 'switchBody'),
  })(theme)}
  ${({theme, variant}) => getFromThemeObj(theme, `${variant}.switchBody`, 'switch')}
  
  &::before {
    content: '';
    position: absolute;
    border-radius: 50%;
    border-width: 1px;
    border-style: solid;
    top: -1.8px;
    left: -1px;
    height: inherit;
    transition: .5s;
    boxShadow: 0 2px 5px rgba(0, 0, 0, .3);
    transform: scale(1.1);
    ${({theme, variant}) => css({
      ...getDefaultTheme(variant, 'switchHandle'),
      width: parseInt(getWidth(theme, variant)) / 2,
    })(theme)}
    ${({theme, variant}) => getFromThemeObj(theme, `${variant}.switchHandle`, 'switch')}
  }

  &:checked:before {
    ${({theme, variant}) => css({
    ...getDefaultTheme(variant, 'switchHandle'),
      left: parseInt(getWidth(theme, variant)) * 0.5,
    })(theme)}
    ${({theme, variant}) => getFromThemeObj(theme, `${variant}.switchHandle.&:checked`, 'switch')}
  }
`;

export default props => <Checkbox {...props} type='checkbox' />;
