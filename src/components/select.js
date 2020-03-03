import styled from '@emotion/styled';
import {
  Select as select,
} from 'theme-ui';

import {
  applyVariation,
} from './../utils/getVariations';

const variant = ({
  theme,
  variant = 'primary',
  themeKey = 'placeholderVariants',
}) => applyVariation(theme, variant, themeKey);

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

export default Select;
