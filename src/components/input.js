import styled from '@emotion/styled';
import { css, get, Input as input, Select as select, Textarea as textarea } from 'theme-ui';

const variant = ({ theme, variant = 'primary', themeKey = 'placeholderVariants' }) =>
  css(get(theme, themeKey + '.' + variant, get(theme, variant)));

const Input = styled(input)`
  ::-webkit-input-placeholder {
    ${variant}
  }
  ::-moz-placeholder {
    ${variant}
  }
  :-ms-input-placeholder {
    ${variant}
  }
  :-moz-placeholder {
    ${variant}
  }
`;

const Select = styled(select)`
  ::-webkit-input-placeholder {
    ${variant}
  }
  ::-moz-placeholder {
    ${variant}
  }
  :-ms-input-placeholder {
    ${variant}
  }
  :-moz-placeholder {
    ${variant}
  }
`;

const Textarea = styled(textarea)`
  ::-webkit-input-placeholder {
    ${variant}
  }
  ::-moz-placeholder {
    ${variant}
  }
  :-ms-input-placeholder {
    ${variant}
  }
  :-moz-placeholder {
    ${variant}
  }
`;

export {
  Input,
  Select,
  Textarea,
};
