import styled from '@emotion/styled';
import { Box, css } from 'theme-ui';
import { Absolute, Fixed, Relative } from './../position';

export const Overlay = styled(Fixed)(
  {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&.modal-enter': {
      opacity: 0,
      '> div': {
        transform: 'scale(0.95)',
        transition: 'all 200ms linear',
      },
    },
    '&.modal-enter-active': {
      opacity: 1,
      transition: 'all 200ms ease-in',
      '> div': {
        transform: 'scale(1)',
      },
    },
    '&.modal-exit': {
      opacity: 1,
    },
    '&.modal-exit-active': {
      opacity: 0,
      transition: 'all 200ms ease-out',
      '> div': {
        transform: 'scale(0.95)',
        transition: 'all 200ms linear',
      },
    },
  },
);

export const Content = styled(Relative)(
  ({ theme }) => css({
    bg: 'white',
    p: 4,
    width: '60%',
    minHeight: '60%',
    borderRadius: 1,
    boxShadow: '0 1px 15px rgba(0,0,0,.75)',
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
