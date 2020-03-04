import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import { Box, css } from 'theme-ui';
import { Absolute, Fixed } from './../position';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

const modalAnimation = ({ isClosed }) => ({
  opacity: (isClosed ? 0 : 1),
  animation: `${isClosed ? fadeOut : fadeIn} 500ms`,
});

export const Overlay = styled(Fixed)(
  {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
  },
  modalAnimation,
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
  modalAnimation,
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
