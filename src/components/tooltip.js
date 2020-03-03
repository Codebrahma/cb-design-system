import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box, css } from 'theme-ui';

import { Absolute, Relative } from './position';

const TooltipContainer = styled(Relative)({
  display: 'inline-flex',
});

const TooltipToggler = styled(Box)(
  css({
    ':hover': {
      cursor: 'pointer',
    },
  })
);

const TooltipMessage = styled(Absolute)(
  ({ theme, bg = 'background', color = 'text' }) =>
    css({
      bg,
      color,
      px: 5,
      py: 4,
      whiteSpace: 'pre',
      textDecoration: 'none',
      zIndex: 2000,
      '::after': {
        width: 0,
        height: 0,
        border: '6px solid',
        borderColor: 'transparent',
        content: '""',
        position: 'absolute',
        zIndex: 3000,
      },
    })(theme),
  ({ position, theme, bg = 'background' }) => {
    switch (position) {
      case 'left':
        return css({
          mr: 2,
          top: '50%',
          right: '100%',
          boxShadow: '0.5rem 0.5rem 1.5rem 0 rgba(0, 0, 0, 0.1)',
          '::after': {
            borderLeftColor: bg,
            borderRight: 'none',
            top: '50%',
            right: '-6px',
            mt: '-3px',
          },
        })(theme);

      case 'right':
        return css({
          ml: 2,
          top: '50%',
          left: '100%',
          boxShadow: '-0.5rem 0.5rem 1.5rem 0 rgba(0, 0, 0, 0.1)',
          '::after': {
            borderRightColor: bg,
            borderLeft: 'none',
            top: '50%',
            left: '-3px',
            mt: '-6px',
          },
        })(theme);

      case 'top':
        return css({
          mb: 2,
          bottom: '100%',
          left: '0%',
          transform: 'translate(-50%)',
          boxShadow: '0 0.5rem 1.5rem 0 rgba(0, 0, 0, 0.1)',
          '::after': {
            borderTopColor: bg,
            borderBottom: 'none',
            bottom: '-6px',
            left: '50%',
            mb: '0',
          },
        })(theme);

      case 'bottom':
      default:
        return css({
          mt: 2,
          top: '100%',
          transform: 'translate(-50%)',
          boxShadow: '0 -0.5rem 1.5rem 0 rgba(0, 0, 0, 0.1)',
          '::after': {
            borderBottomColor: bg,
            borderTop: 'none',
            top: '-6px',
            left: '50%',
            mt: '0',
          },
        })(theme);
    }
  },
  ({ css: styles, theme }) => css(styles)(theme),
);

const Tooltip = ({ position, message, children, ...messageProps }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);
  const [style, setStyle] = useState({});
  const node = useRef(null);

  useEffect(() => {
    if (!node.current) {
      return;
    }
    const newStyle = {};

    if (position === 'top' || position === 'bottom') {
      newStyle.left = `${String(node.current.offsetWidth / 2)}px`;
    } else {
      newStyle.top = `-${String(node.current.offsetHeight / 1.5)}px`;
    }

    setStyle(newStyle);
  }, [node.current]);

  return (
    <TooltipContainer>
      <TooltipToggler
        onMouseOverCapture={toggle}
        onMouseOut={toggle}
        ref={node}
      >
        {children}
      </TooltipToggler>

      {isVisible && (
        <TooltipMessage
          position={position}
          {...messageProps}
          style={style}
        >
          {message}
        </TooltipMessage>
      )}
    </TooltipContainer>
  );
};

Tooltip.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  position: PropTypes.string,
};

Tooltip.defaultProps = {
  position: 'top',
};

export default Tooltip;
