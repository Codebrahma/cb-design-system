import styled from '@emotion/styled';
import { css, get, Input as input } from 'theme-ui';

const variant = ({ theme, variant = 'primary', themeKey = 'placeHolder' }) =>
  css(get(theme, themeKey + '.' + variant, get(theme, variant)));

const Input = styled(input)`
  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    ${variant}
  }
  ::-moz-placeholder { /* Firefox 19+ */
    ${variant}
  }
  :-ms-input-placeholder { /* IE 10+ */
    ${variant}
  }
  :-moz-placeholder { /* Firefox 18- */
    ${variant}
  }
`;

export default Input;
