import styled from '@emotion/styled';
import {
  applyVariation,
} from './getStyles';

export default (comp) => {
  const variantStyles = ({
    theme,
    variant = 'primary',
    themeKey = 'placeholderVariants',
  }) => applyVariation(theme, variant, themeKey);

  return styled(comp)`
    ::-webkit-input-placeholder {
      ${variantStyles}
    }
    ::-moz-placeholder {
      ${variantStyles}
    }
    :-ms-input-placeholder {
      ${variantStyles}
    }
    :-moz-placeholder {
      ${variantStyles}
    }
  `;
};
