import { Input } from 'theme-ui';
import styled from '@emotion/styled';
import withPlaceholderVariant from '../utils/placeholderVariant';
import { applyFocus } from '../utils/getStyles';

export default styled(withPlaceholderVariant(Input))`
  ${({theme}) => applyFocus(theme)}
`;
