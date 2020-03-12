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

export {
  applyVariation,
  applyFocus,
};
