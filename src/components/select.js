import styled from '@emotion/styled';
import { Select } from 'theme-ui';
import withPlaceholderVariant from '../utils/placeholderVariant';
import { applyFocus } from '../utils/getStyles';

export default styled(withPlaceholderVariant(Select))`
  ${({theme}) => applyFocus(theme)}
`;
