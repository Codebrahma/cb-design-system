import styled from '@emotion/styled';
import { css, Box } from 'theme-ui';
import { applyVariation } from './../utils/getStyles';

const ButtonGroup = styled(Box)`
  ${({ theme }) => css({
    display: 'inline-flex',
    'button': {
      margin: 0,
      borderRadius: 0,
      '&:first-of-type': {
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
      },
      '&:last-child': {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
      },
    },
  })(theme)}
  ${({ theme, variant = 'primary' }) => applyVariation(theme, `${variant}`, 'buttonGroup')}
`;

export default ButtonGroup;
