import styled from '@emotion/styled';
import {
  applyVariation,
} from './getVariations';

const withPlaceHolderVariant = (comp) => {
  const variantStyles = ({
    theme,
    variant = 'primary',
    themeKey = 'placeholderVariants',
  }) => applyVariation(theme, variant, themeKey);

  const Component = styled(comp)`
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

  return Component;
};

export { withPlaceHolderVariant };
