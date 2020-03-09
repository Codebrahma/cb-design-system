import styled from '@emotion/styled';
import { Box, css } from 'theme-ui';

export const CloseButton = styled(Box)(
  css({
    cursor: 'pointer',
    bg: 'none',
    outline: 'none',
  }),
);

export const Content = styled(Box)(
  css({
    width: '100%',
  }),
);
