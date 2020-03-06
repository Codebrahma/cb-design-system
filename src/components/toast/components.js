import styled from '@emotion/styled';
import { Flex, Box, css } from 'theme-ui';

export const ToastContainer = styled(Flex)(
  (theme) => css({
    p: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'border',
    position: 'fixed',
    top: '10px',
    width: '80%',
    left: '50%',
    transform: 'translateX(-50%)',
    bg: 'white',
    '&.toast-enter': {
      opacity: 0,
    },
    '&.toast-enter-active': {
      opacity: 1,
      transition: 'all 400ms ease-in',
    },
    '&.toast-exit': {
      opacity: 1,
    },
    '&.toast-exit-active': {
      opacity: 0,
      transition: 'all 400ms ease-out',
    },
  })(theme),
);

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
