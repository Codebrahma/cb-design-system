import styled from '@emotion/styled';
import {
  applyVariation,
} from './getVariations';

const withPlaceHolderVariant = (comp) => {
  const variant = ({
    theme,
    variant = 'primary',
    themeKey = 'placeholderVariants',
  }) => applyVariation(theme, variant, themeKey);

  const Component = styled(comp)`
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

  return Component;
};

export { withPlaceHolderVariant };
