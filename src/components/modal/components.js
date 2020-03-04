import styled from '@emotion/styled';
import { Box, css } from 'theme-ui';
import { Absolute, Fixed } from './../position';

export const Overlay = styled(Fixed)(
  {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    '&.modal-enter': {
      opacity: 0,
      transform: 'scale(1)',
    },
    '&.modal-enter-active': {
      opacity: 1,
      transform: 'translateX(0)',
      transition: 'opacity 300ms, transform 300ms',
    },
    '&.modal-exit': {
      opacity: 1,
    },
    '&.modal-exit-active': {
      opacity: 0,
      transform: 'scale(1)',
      transition: 'opacity 300ms, transform 300ms',
    },
  },
);

export const Content = styled(Fixed)(
  ({ theme }) => css({
    bg: 'white',
    p: 4,
    width: '60%',
    minHeight: '60%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: 1,
  })(theme),
);

export const CloseButton = styled(Absolute)(
  ({ theme }) => css({
    top: '5px',
    right: '10px',
    cursor: 'pointer',
    bg: 'none',
    outline: 'none',
  })(theme),
);

export const Header = styled(Box)(
  ({ theme }) => css({
    borderBottom: '1px solid',
    borderBottomColor: 'border',
  })(theme),
);

export const Body = styled(Box)({
  px: 3,
  py: 0,
});

export const Footer = styled(Box)(
  (theme) => css({
    borderBottom: '1px solid',
    borderBottomColor: 'border',
    px: 3,
    py: 0,
  })(theme),
);
