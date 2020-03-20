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

const getThemeStyles = (...args) => {
  let theme = null;
  for (let i = 0; i < args.length; i++) {
    theme = !theme ? args[i] : theme[args[i]];
  }
  return theme;
};

export {
  getThemeStyles,
  applyVariation,
  applyFocus,
};
