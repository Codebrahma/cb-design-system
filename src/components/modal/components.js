import styled from '@emotion/styled';
import { Box, css } from 'theme-ui';
import { Absolute, Fixed, Relative } from './../position';
import { applyVariation } from './../../utils/getVariations';

const themeKey = 'modal';
const getStyleForVariant = (subVariant) => (
  ({ theme, variant }) => variant ? applyVariation(theme, `${variant}.${subVariant}`, themeKey) : null
);

export const Overlay = styled(Fixed)(
  {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&.modal-enter': {
      opacity: 0,
    },
    '&.modal-enter-active': {
      opacity: 1,
      transition: 'all 200ms ease-in',
    },
    '&.modal-exit': {
      opacity: 1,
    },
    '&.modal-exit-active': {
      opacity: 0,
      transition: 'all 200ms ease-out',
    },
  },
  getStyleForVariant('overlay'),
);

export const ContentContainer = styled(Relative)(
  ({ theme }) => css({
    bg: 'white',
    width: '60%',
    minHeight: '40%',
    borderRadius: 1,
  })(theme),
  getStyleForVariant('contentContainer'),
);

export const CloseButton = styled(Absolute)(
  ({ theme }) => css({
    top: '5px',
    right: '10px',
    cursor: 'pointer',
    outline: 'none',
  })(theme),
  getStyleForVariant('closeButton'),
);

export const Header = styled(Box)(
  ({ theme }) => css({
    p: 4,
    borderBottom: '1px solid',
    borderBottomColor: 'borderGray',
  })(theme),
  getStyleForVariant('header'),
);

export const Body = styled(Box)(
  ({ theme }) => css({
    p: 4,
  })(theme),
  getStyleForVariant('body'),
);

export const Footer = styled(Box)(
  (theme) => css({
    p: 4,
    borderBottom: '1px solid',
    borderBottomColor: 'borderGray',
  })(theme),
  getStyleForVariant('footer'),
);
