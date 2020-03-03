import styled from '@emotion/styled';
import {
  Textarea as textarea,
} from 'theme-ui';

import {
  applyVariation,
} from './../utils/getVariations';

const variant = ({
  theme,
  variant = 'primary',
  themeKey = 'placeholderVariants',
}) => applyVariation(theme, variant, themeKey);

const Textarea = styled(textarea)`
  max-width: 100%;
  
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

export default Textarea;
