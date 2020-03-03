import styled from '@emotion/styled';
import { Box, get } from 'theme-ui';

const Hide = styled(Box)`
  ${({theme, when}) => {
    return `
      @media Screen and (max-width: ${get(theme, 'breakpoints')[when]}) {
        display: none;
      }
    `;
  }}
`;

export default Hide;
