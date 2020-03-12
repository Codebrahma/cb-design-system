import styled from '@emotion/styled';
import { Textarea } from 'theme-ui';
import withPlaceholderVariant from '../utils/placeholderVariant';
import { applyFocus } from '../utils/getStyles';

export default styled(withPlaceholderVariant(Textarea))`
  ${({theme}) => applyFocus(theme)}
`;
