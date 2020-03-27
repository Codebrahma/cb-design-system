import { css, get } from 'theme-ui';

const applyVariation = (theme, variant, themeKey) =>
  css(get(theme, themeKey + '.' + variant, get(theme, variant)));

const applyFocus = (theme) => css({
  '&:focus': {
    boxShadow: '#add9f5 0px 0px 0px 2px',
    outline: 'none',
    borderColor: 'info',
  },
})(theme);

const UP_ARROW = 38;
const DOWN_ARROW = 40;
const ENTER_KEY = 13;

export {
  applyVariation,
  applyFocus,
  UP_ARROW,
  DOWN_ARROW,
  ENTER_KEY,
};
